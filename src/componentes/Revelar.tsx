import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

/** Revela o bloco conforme ele sobe na tela.
 *
 *  A animação é 100% CSS (scroll-driven, ver `.revelar` em estilo.css):
 *  sem observador, sem estado, sem chance de o conteúdo ficar preso
 *  invisível se o JS falhar. Onde o navegador não suporta linha do tempo
 *  de rolagem, o bloco simplesmente aparece — que é o comportamento certo. */
export function Revelar({ children, className = '', as = 'div' }: Props) {
  const Tag = as
  return <Tag className={'revelar' + (className ? ' ' + className : '')}>{children}</Tag>
}
