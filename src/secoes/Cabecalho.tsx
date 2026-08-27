import { useEffect, useState } from 'react'
import { Botao, SetaWhatsapp } from '../componentes/Botao'
import { linkWhatsapp, linkEmail } from '../lib/links'

const ancoras = [
  { href: '#projetos', texto: 'Projetos' },
  { href: '#processo', texto: 'Processo' },
  { href: '#orcamento', texto: 'Orçamento' },
]

export function Cabecalho() {
  const [rolou, setRolou] = useState(false)
  const [progresso, setProgresso] = useState(0)
  const zap = linkWhatsapp()
  const mail = linkEmail('Orçamento de site')

  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY
      setRolou(y > 24)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgresso(total > 0 ? Math.min(1, y / total) : 0)
    }
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
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
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-neon transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progresso})` }}
      />
    </header>
  )
}
