import { useRef, type CSSProperties, type PointerEvent as EventoPonteiro } from 'react'
import { equipe, type Pessoa } from '../dados'
import { Revelar } from '../componentes/Revelar'
import { TextoRevelado } from '../componentes/TextoRevelado'
import { movimentoPausado } from '../lib/movimento'

function IconeGithub({ tamanho = 22 }: { tamanho?: number }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  )
}

export function Equipe() {
  const primeiro = equipe[0]
  const segundo = equipe[1]

  return (
    <section id="equipe" className="scroll-mt-24 border-b border-linha bg-fundo-2">
      <div className="mx-auto max-w-[86rem] py-20 respiro-lateral sm:py-28">
        <Revelar>
          <p className="rotulo text-texto-fraco">Quem faz</p>
        </Revelar>
        <TextoRevelado
          as="h2"
          texto="Duas pessoas. Nenhuma camada no meio."
          className="display mt-6 block max-w-[14ch] text-[clamp(2rem,5.5vw,4.25rem)]"
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-linha bg-linha sm:mt-20 lg:grid-cols-2">
          {primeiro ? <Cartao pessoa={primeiro} lado="esquerda" /> : null}

          {segundo ? (
            <Cartao pessoa={segundo} lado="direita" />
          ) : (
            /* Metade honesta: o segundo perfil entra aqui quando existir.
               Melhor uma vaga assumida do que uma pessoa inventada. */
            <div className="metade-direita flex flex-col justify-center bg-fundo p-8 sm:p-12">
              <span
                aria-hidden="true"
                className="inline-flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-linha-forte text-texto-fraco"
              >
                <IconeGithub tamanho={30} />
              </span>
              <p className="rotulo mt-8 text-texto-fraco">A outra metade</p>
              <p className="medida-texto mt-4 text-[1.05rem] leading-relaxed text-texto-medio">
                O estúdio é de duas pessoas. O segundo perfil ainda não está no GitHub, e este
                espaço fica reservado para quando estiver: foto, função e link, do mesmo jeito que o
                da esquerda.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Cartao({ pessoa, lado }: { pessoa: Pessoa; lado: 'esquerda' | 'direita' }) {
  const ref = useRef<HTMLDivElement>(null)

  /* Posição do ponteiro e inclinação vão direto para variáveis CSS.
     Como estado React, isso re-renderizaria o cartão a cada pixel. */
  function aoMover(ev: EventoPonteiro<HTMLDivElement>) {
    const el = ref.current
    if (!el || movimentoPausado()) return
    const r = el.getBoundingClientRect()
    const x = (ev.clientX - r.left) / r.width
    const y = (ev.clientY - r.top) / r.height
    el.style.setProperty('--px', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--py', `${(y * 100).toFixed(1)}%`)
    el.style.setProperty('--tx', `${((x - 0.5) * 7).toFixed(2)}deg`)
    el.style.setProperty('--ty', `${((0.5 - y) * 5).toFixed(2)}deg`)
  }

  function aoSair() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tx', '0deg')
    el.style.setProperty('--ty', '0deg')
  }

  return (
    <div
      ref={ref}
      onPointerMove={aoMover}
      onPointerLeave={aoSair}
      className={
        'cartao-luz group relative isolate overflow-hidden bg-fundo p-8 transition-colors duration-500 hover:bg-fundo-3 sm:p-12 ' +
        (lado === 'esquerda' ? 'metade-esquerda' : 'metade-direita')
      }
    >
      <div className="cartao-inclina relative z-10">
        {/* Foto com anel girando por trás. Cinza em repouso, cor no
            hover: é o que faz o cartão "acordar" sem piscar nada. */}
        <div className="anel-vivo relative inline-block h-28 w-28 rounded-full">
          <span className="absolute inset-0 rounded-full bg-fundo" />
          {pessoa.foto ? (
            <img
              src={pessoa.foto}
              srcSet={pessoa.fotoPequena ? `${pessoa.fotoPequena} 200w, ${pessoa.foto} 400w` : undefined}
              sizes="112px"
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              alt={`Foto de perfil de ${pessoa.nome} no GitHub`}
              className="absolute inset-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-full object-cover grayscale transition-[filter,transform] duration-700 ease-fisica group-hover:scale-[1.04] group-hover:grayscale-0"
            />
          ) : (
            <span
              aria-hidden="true"
              className="display absolute inset-[3px] inline-flex items-center justify-center rounded-full bg-fundo-3 text-[1.6rem] text-texto-fraco"
            >
              {pessoa.iniciais}
            </span>
          )}
        </div>

        <p className="display mt-8 text-[clamp(1.9rem,4vw,3rem)] transition-colors duration-500 group-hover:text-neon">
          {pessoa.nome}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="rotulo text-texto-fraco">{pessoa.papel}</p>
          {pessoa.local ? (
            <p className="rotulo text-texto-fraco">
              <span aria-hidden="true" className="mr-2 text-linha-forte">
                ·
              </span>
              {pessoa.local}
            </p>
          ) : null}
        </div>

        <p className="medida-texto mt-5 text-[0.9375rem] leading-relaxed text-texto-medio">
          {pessoa.bio}
        </p>

        {/* Fichas da stack, escalonadas conforme a seção sobe */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {pessoa.stack.map((tec, i) => (
            <li
              key={tec}
              className="ficha rounded-[2px] border border-linha-forte px-2.5 py-1 font-mono text-[0.7rem] tracking-[0.08em] text-texto-medio uppercase transition-colors duration-500 group-hover:border-neon/45 group-hover:text-texto"
              style={
                {
                  animationRange: `entry ${(i * 6).toFixed(0)}% entry ${(38 + i * 6).toFixed(0)}%`,
                } as CSSProperties
              }
            >
              {tec}
            </li>
          ))}
        </ul>

        {pessoa.github ? (
          <a
            href={pessoa.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rotulo mt-8 inline-flex min-h-11 items-center gap-3 text-texto transition-colors duration-500 hover:text-neon focus-visible:text-neon"
          >
            <IconeGithub />
            {/* Sem caixa alta e sem tradução automática: apelido de
                perfil é identificador, precisa ler exatamente como é. */}
            <span className="normal-case" translate="no">
              {pessoa.arroba ? `@${pessoa.arroba}` : 'GitHub'}
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-fisica group-hover:translate-x-1"
            >
              ↗
            </span>
          </a>
        ) : null}
      </div>

      {/* Traço que corre a base do cartão */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-px origin-left scale-x-0 bg-neon transition-transform duration-700 ease-fisica group-hover:scale-x-100 group-focus-within:scale-x-100"
      />
    </div>
  )
}
