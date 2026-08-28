import { useEffect, useState } from 'react'
import {
  alternarMovimento,
  iniciarMovimento,
  movimentoPausado,
  ouvirMovimento,
} from '../lib/movimento'

/* Botão discreto, fixo no canto, que para a faixa rolante e a onda.
   Fica no fim da ordem de tabulação do rodapé, não no começo da
   página: é um controle de conforto, não a ação principal. */
export function ControleMovimento() {
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    iniciarMovimento()
    setPausado(movimentoPausado())
    return ouvirMovimento(setPausado)
  }, [])

  return (
    <button
      type="button"
      onClick={alternarMovimento}
      aria-pressed={pausado}
      className="rotulo fixed bottom-4 right-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-[2px] border border-linha-forte bg-fundo/85 px-3 py-2 text-texto-fraco backdrop-blur-[6px] transition-colors duration-300 hover:border-neon hover:text-neon"
    >
      <span aria-hidden="true" className="text-[0.8rem] leading-none">
        {pausado ? '▶' : '❚❚'}
      </span>
      {pausado ? 'Retomar animações' : 'Pausar animações'}
    </button>
  )
}
