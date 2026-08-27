import { useEffect, useRef } from 'react'

/* ============================================================
   Campo de pontos em onda — WebGL cru, sem biblioteca.

   Escrito do zero (o preset "Point Waves" do shaders.com é pago
   e licenciado). São ~9 mil pontos deslocados por senóides em
   camadas, mais uma ondulação que nasce onde o ponteiro está.

   Regras que o componente respeita sozinho:
   - Sem WebGL, o canvas some e o fundo sólido fica no lugar.
   - Fora da tela ou aba escondida, o laço para.
   - `prefers-reduced-motion` desenha um quadro parado, sem laço.
   - No celular a grade cai pela metade e o DPR é limitado a 1.5.
   ============================================================ */

const VERTEX = `
attribute vec2 aGrade;

uniform float uTempo;
uniform vec2  uPonteiro;
uniform float uAspecto;
uniform float uForca;
uniform float uEscala;

varying float vAltura;
varying float vProx;

void main() {
  vec2 p = aGrade;

  /* O eixo Y da grade é profundidade. O X é multiplicado pela
     profundidade de propósito: assim cada fileira cobre a largura
     inteira da tela depois da divisão em perspectiva, em vez de as
     fileiras próximas escaparem pelas laterais com 8% dos pontos. */
  float profundidade = 0.5 + (p.y * 0.5 + 0.5) * 9.5;
  float mundoX = p.x * profundidade * 0.92;

  /* Ondas calculadas em coordenadas de mundo, não de grade: é o que
     faz as cristas correrem para o horizonte como uma superfície. */
  float o1 = sin(mundoX * 0.72 + uTempo * 0.5) * 0.55;
  float o2 = sin(profundidade * 0.62 - uTempo * 0.42) * 0.5;
  float o3 = sin((mundoX * 0.38 + profundidade * 0.55) * 0.62 + uTempo * 0.3) * 0.42;
  float altura = clamp((o1 + o2 + o3) / 1.05, -1.0, 1.0);

  vec2 m = vec2(uPonteiro.x * uAspecto, uPonteiro.y);
  vec2 q = vec2(p.x * uAspecto, p.y);
  float d = distance(q, m);
  float pulso = exp(-d * 2.1) * sin(d * 9.0 - uTempo * 2.3);
  altura += pulso * 1.15 * uForca;

  vAltura = altura;

  float persp = 1.0 / profundidade;
  vProx = persp;

  float alturaMundo = altura * 0.35 - 0.75;

  /* 0.55 é a linha do horizonte em espaço de recorte: a superfície
     ocupa da base da tela até um pouco acima do meio. */
  gl_Position = vec4(mundoX * persp * 1.2, alturaMundo * persp * 1.2 + 0.55, 0.0, 1.0);

  float crista = clamp(altura * 0.5 + 0.5, 0.0, 1.0);
  /* Teto no tamanho: sem ele as fileiras da frente encostam uma na
     outra e a onda vira linha sólida em vez de campo de pontos. */
  gl_PointSize = clamp((0.9 + pow(crista, 1.3) * 3.4 + pulso * 2.2 * uForca) * persp * 2.0 * uEscala,
                       1.0, 7.0 * uEscala);
}
`

const FRAGMENT = `
precision mediump float;

varying float vAltura;
varying float vProx;

uniform vec3 uCor;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;

  float suave = smoothstep(0.5, 0.05, r);

  /* Expoente suave: separa crista de vale sem esmagar o campo
     inteiro para perto de zero. */
  float t = pow(clamp(vAltura * 0.5 + 0.5, 0.0, 1.0), 1.3);

  /* O que está longe some no fundo — é o que dá a sensação de
     profundidade sem precisar de névoa desenhada. */
  float perto = smoothstep(0.09, 0.9, vProx);

  vec3 escura = uCor * 0.22;
  vec3 cor = mix(escura, uCor, t) * (0.35 + t * 1.7);

  float a = suave * (0.16 + t * 0.84) * (0.3 + perto * 0.7);
  gl_FragColor = vec4(cor * a, a);
}
`

function paraRgb(hex: string): [number, number, number] {
  const limpo = hex.replace('#', '')
  const n = parseInt(limpo.length === 3 ? limpo.replace(/./g, (c) => c + c) : limpo, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function compilar(gl: WebGLRenderingContext, tipo: number, fonte: string) {
  const s = gl.createShader(tipo)
  if (!s) return null
  gl.shaderSource(s, fonte)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s)
    return null
  }
  return s
}

type Props = {
  /** Cor de destaque da onda. Acompanha o projeto ativo no portfólio. */
  cor?: string
  className?: string
}

export function OndaPontos({ cor = '#5cfd86', className = '' }: Props) {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refCor = useRef(cor)
  refCor.current = cor

  useEffect(() => {
    const canvas = refCanvas.current
    if (!canvas) return

    const gl =
      (canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true }) as
        | WebGLRenderingContext
        | null) ??
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)

    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    const vs = compilar(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const prog = gl.createProgram()
    if (!vs || !fs || !prog) {
      canvas.style.display = 'none'
      return
    }
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.style.display = 'none'
      return
    }
    gl.useProgram(prog)

    const estreito = window.matchMedia('(max-width: 767px)').matches
    const colunas = estreito ? 84 : 170
    const linhas = estreito ? 50 : 96

    const pontos = new Float32Array(colunas * linhas * 2)
    let i = 0
    for (let y = 0; y < linhas; y++) {
      for (let x = 0; x < colunas; x++) {
        pontos[i++] = (x / (colunas - 1)) * 2 - 1
        pontos[i++] = (y / (linhas - 1)) * 2 - 1
      }
    }

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, pontos, gl.STATIC_DRAW)
    const aGrade = gl.getAttribLocation(prog, 'aGrade')
    gl.enableVertexAttribArray(aGrade)
    gl.vertexAttribPointer(aGrade, 2, gl.FLOAT, false, 0, 0)

    const u = {
      tempo: gl.getUniformLocation(prog, 'uTempo'),
      ponteiro: gl.getUniformLocation(prog, 'uPonteiro'),
      aspecto: gl.getUniformLocation(prog, 'uAspecto'),
      forca: gl.getUniformLocation(prog, 'uForca'),
      escala: gl.getUniformLocation(prog, 'uEscala'),
      cor: gl.getUniformLocation(prog, 'uCor'),
    }

    gl.enable(gl.BLEND)
    /* Aditivo com alfa pré-multiplicado. Com alfa NÃO pré-multiplicado
       o canal alfa acumulava baixo e o compositor do navegador
       multiplicava a cor por ele — a onda saía quase preta. */
    gl.blendFunc(gl.ONE, gl.ONE)
    gl.clearColor(0, 0, 0, 0)

    /* ResizeObserver em vez de ouvir `resize` na janela: o canvas
       chega a medir 0 de largura na montagem, e o observador
       remede sozinho quando o layout assenta. */
    let dpr = 1
    function medir() {
      if (!canvas || !gl) return
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const l = canvas.clientWidth
      const a = canvas.clientHeight
      if (l < 2 || a < 2) return
      const novoL = Math.max(1, Math.floor(l * dpr))
      const novoA = Math.max(1, Math.floor(a * dpr))

      /* Redimensionar o buffer é caro, então só mexe se mudou. Os
         uniformes, não: eles pertencem ao PROGRAMA, e em StrictMode o
         efeito roda duas vezes — o segundo programa nasce zerado. Sair
         cedo daqui deixava uEscala em 0 e todo ponto virava 1px. */
      if (canvas.width !== novoL || canvas.height !== novoA) {
        canvas.width = novoL
        canvas.height = novoA
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(u.aspecto, l / a)
      gl.uniform1f(u.escala, dpr * (estreito ? 1.15 : 1))
    }
    medir()

    const observadorTamanho = new ResizeObserver(() => medir())
    observadorTamanho.observe(canvas)

    /* O ponteiro puxa a onda; o alvo é interpolado para o
       movimento não ficar duro. */
    const alvo = { x: 0.15, y: 0.1 }
    const atual = { x: 0.15, y: 0.1 }
    let forcaAlvo = 0.35

    function aoMover(ev: PointerEvent) {
      if (!canvas) return
      const r = canvas.getBoundingClientRect()
      const dentro =
        ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom
      if (!dentro) {
        forcaAlvo = 0.35
        return
      }
      alvo.x = ((ev.clientX - r.left) / r.width) * 2 - 1
      alvo.y = -(((ev.clientY - r.top) / r.height) * 2 - 1)
      forcaAlvo = 1
    }
    function aoSair() {
      forcaAlvo = 0.35
    }

    /* O ouvinte fica na janela, não no canvas: assim o conteúdo por
       cima continua selecionável e clicável, sem truque de
       `pointer-events` que quebraria a seleção de texto. */
    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!menosMovimento) {
      window.addEventListener('pointermove', aoMover, { passive: true })
      window.addEventListener('pointerdown', aoMover, { passive: true })
      document.addEventListener('pointerleave', aoSair, { passive: true })
    }

    let forca = forcaAlvo
    let quadro = 0
    let visivel = true
    let rodando = false
    const inicio = performance.now()

    function desenhar(t: number) {
      if (!gl) return
      const seg = (t - inicio) / 1000
      atual.x += (alvo.x - atual.x) * 0.06
      atual.y += (alvo.y - atual.y) * 0.06
      forca += (forcaAlvo - forca) * 0.05

      gl.uniform1f(u.tempo, seg)
      gl.uniform2f(u.ponteiro, atual.x, atual.y)
      gl.uniform1f(u.forca, forca)
      gl.uniform3fv(u.cor, paraRgb(refCor.current))

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.POINTS, 0, colunas * linhas)
    }

    function laco(t: number) {
      desenhar(t)
      quadro = requestAnimationFrame(laco)
    }

    function tocar() {
      if (rodando || menosMovimento || !visivel || document.hidden) return
      rodando = true
      quadro = requestAnimationFrame(laco)
    }
    function parar() {
      if (!rodando) return
      rodando = false
      cancelAnimationFrame(quadro)
    }

    if (menosMovimento) {
      /* Um quadro só: a textura aparece, nada se mexe. Vai depois de
         um tique para o ResizeObserver já ter dado o tamanho certo. */
      requestAnimationFrame(() => {
        medir()
        desenhar(inicio + 1200)
      })
    } else {
      tocar()
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        visivel = e.isIntersecting
        if (visivel) tocar()
        else parar()
      },
      { threshold: 0 },
    )
    obs.observe(canvas)

    function aoTrocarAba() {
      if (document.hidden) parar()
      else tocar()
    }
    document.addEventListener('visibilitychange', aoTrocarAba)

    function aoPerderContexto(ev: Event) {
      ev.preventDefault()
      parar()
    }
    canvas.addEventListener('webglcontextlost', aoPerderContexto)

    return () => {
      parar()
      obs.disconnect()
      document.removeEventListener('visibilitychange', aoTrocarAba)
      canvas.removeEventListener('webglcontextlost', aoPerderContexto)
      observadorTamanho.disconnect()
      window.removeEventListener('pointermove', aoMover)
      window.removeEventListener('pointerdown', aoMover)
      document.removeEventListener('pointerleave', aoSair)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <canvas
      ref={refCanvas}
      aria-hidden="true"
      className={'h-full w-full' + (className ? ' ' + className : '')}
    />
  )
}
