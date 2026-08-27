import { Fragment, type CSSProperties } from 'react'

type Props = {
  texto: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  /** Revela letra por letra em vez de palavra por palavra. Reserve
   *  para uma ou duas frases por página: em texto corrido vira ruído. */
  porLetra?: boolean
  /** Quanto do intervalo de entrada o escalonamento ocupa (em %). */
  espalhamento?: number
  /** Largura do intervalo de cada pedaço (em %). */
  janela?: number
  /** Anima na carga da página em vez de na rolagem. Use no herói,
   *  que já nasce visível e portanto nunca "entra" na tela. */
  naEntrada?: boolean
  /** Atraso entre pedaços, em ms. Só vale com `naEntrada`. */
  passo?: number
}

/* Cada pedaço sobe por trás de uma máscara. O escalonamento não vem
   de `animation-delay` (que não se aplica a linha do tempo de rolagem),
   e sim de um `animation-range` próprio por pedaço, calculado aqui.
   Sem JS em execução: o navegador liga a animação à rolagem sozinho.

   O texto completo fica no aria-label e os pedaços viram decoração,
   para o leitor de tela ouvir a frase inteira e não letra por letra. */
export function TextoRevelado({
  texto,
  className = '',
  as = 'span',
  porLetra = false,
  espalhamento = 55,
  janela = 45,
  naEntrada = false,
  passo = 26,
}: Props) {
  const Tag = as
  const palavras = texto.split(' ')

  const pedacos = porLetra
    ? palavras.reduce((soma, p) => soma + p.length, 0)
    : palavras.length
  let indice = 0

  const intervalo = (i: number): CSSProperties => {
    if (naEntrada) return { animationDelay: `${i * passo}ms` }
    const inicio = pedacos > 1 ? (i / (pedacos - 1)) * espalhamento : 0
    return { animationRange: `entry ${inicio.toFixed(1)}% entry ${Math.min(100, inicio + janela).toFixed(1)}%` }
  }

  const classePedaco = naEntrada ? 'palavra palavra-entrada' : 'palavra'

  return (
    <Tag className={className} aria-label={texto}>
      {palavras.map((palavra, ip) => (
        <Fragment key={ip}>
          {/* inline-block por palavra para a quebra de linha continuar
              acontecendo entre palavras, nunca no meio de uma */}
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {porLetra
              ? [...palavra].map((letra, il) => (
                  <span key={il} className="palavra-mascara">
                    <span className={classePedaco} style={intervalo(indice++)}>
                      {letra}
                    </span>
                  </span>
                ))
              : (
                  <span className="palavra-mascara">
                    <span className={classePedaco} style={intervalo(indice++)}>
                      {palavra}
                    </span>
                  </span>
                )}
          </span>
          {ip < palavras.length - 1 ? <span aria-hidden="true"> </span> : null}
        </Fragment>
      ))}
    </Tag>
  )
}
