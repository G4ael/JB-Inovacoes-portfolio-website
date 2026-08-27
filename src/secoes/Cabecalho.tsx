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
  const zap = linkWhatsapp()
  const mail = linkEmail('Orçamento de site')

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <header
      className={
        'sticky top-0 z-50 bg-papel/92 backdrop-blur-[6px] transition-[border-color] duration-300 border-b ' +
        (rolou ? 'border-regua' : 'border-transparent')
      }
    >
      <div className="mx-auto flex max-w-[86rem] items-center gap-4 px-5 py-3.5 sm:px-8">
        <a href="#topo" className="display text-[1.35rem] font-semibold tracking-[-0.04em] leading-none">
          JB<span className="text-tinta-fraca"> Inovações</span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 md:flex" aria-label="Seções do site">
          {ancoras.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="rotulo text-tinta-media transition-colors hover:text-acento"
            >
              {a.texto}
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
    </header>
  )
}
