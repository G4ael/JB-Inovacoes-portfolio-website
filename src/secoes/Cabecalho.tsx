import { useEffect, useRef, useState } from 'react'
import { Botao, SetaWhatsapp } from '../componentes/Botao'
import { linkWhatsapp, linkEmail } from '../lib/links'

const ancoras = [
  { href: '#projetos', texto: 'Projetos' },
  { href: '#processo', texto: 'Processo' },
  { href: '#orcamento', texto: 'Orçamento' },
]

export function Cabecalho() {
  const [rolou, setRolou] = useState(false)
  const refFio = useRef<HTMLDivElement>(null)
  const zap = linkWhatsapp()
  const mail = linkEmail('Orçamento de site')

  useEffect(() => {
    /* O fio de progresso muda a cada quadro de rolagem. Ele é escrito
       direto no DOM em vez de virar estado: como estado, a página
       inteira do cabeçalho re-renderizava a cada pixel rolado.
       `rolou` continua em estado porque muda uma vez, num limiar. */
    let agendado = false
    const aplicar = () => {
      agendado = false
      const y = window.scrollY
      setRolou(y > 24)
      const total = document.documentElement.scrollHeight - window.innerHeight
      const p = total > 0 ? Math.min(1, y / total) : 0
      if (refFio.current) refFio.current.style.transform = `scaleX(${p})`
    }
    const aoRolar = () => {
      if (agendado) return
      agendado = true
      requestAnimationFrame(aplicar)
    }
    aplicar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar, { passive: true })
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return (
    <header
      className={
        'sticky top-0 z-50 bg-fundo/85 backdrop-blur-[10px] transition-[border-color] duration-300 border-b ' +
        (rolou ? 'border-linha' : 'border-transparent')
      }
    >
      <div className="mx-auto flex max-w-[86rem] items-center gap-4 px-5 py-3.5 sm:px-8">
        <a
          href="#topo"
          className="display flex min-h-11 items-center text-[1.35rem] font-semibold leading-none tracking-[-0.04em]"
        >
          {/* O espaço vai DENTRO do span: como o link é flex, um nó de
              texto só com espaço entre itens não vira item e some. */}
          JB<span className="text-texto-fraco">{' '}Inovações</span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 md:flex" aria-label="Seções do site">
          {ancoras.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="rotulo group/link relative flex min-h-11 items-center text-texto-medio transition-colors hover:text-neon"
            >
              {a.texto}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-2.5 h-px origin-left scale-x-0 bg-neon transition-transform duration-300 ease-fisica group-hover/link:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-7">
          {zap ? (
            <Botao href={zap} target="_blank" rel="noopener noreferrer">
              <SetaWhatsapp />
              Pedir orçamento
            </Botao>
          ) : mail ? (
            <Botao href={mail}>Pedir orçamento</Botao>
          ) : (
            <Botao href="#orcamento">Pedir orçamento</Botao>
          )}
        </div>
      </div>

      {/* Fio de progresso da leitura. Informação, não enfeite:
          diz quanto ainda falta de página. */}
      <div
        ref={refFio}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-neon"
      />
    </header>
  )
}
