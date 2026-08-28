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
    /* Recolhido no ícone por padrão: fixo no canto, ele passaria por
       cima do texto se ficasse sempre com o rótulo aberto. O nome
       completo continua no aria-label, então leitor de tela nunca vê
       um botão sem nome. */
    <button
      type="button"
      onClick={alternarMovimento}
      aria-pressed={pausado}
      aria-label={pausado ? 'Retomar animações' : 'Pausar animações'}
      className="group/mov rotulo fixed bottom-4 right-4 z-40 inline-flex min-h-11 items-center gap-0 rounded-[2px] border border-linha-forte bg-fundo/85 px-3 py-2 text-texto-fraco backdrop-blur-[6px] transition-colors duration-300 hover:border-neon hover:text-neon focus-visible:border-neon focus-visible:text-neon"
    >
      <span aria-hidden="true" className="text-[0.8rem] leading-none">
        {pausado ? '▶' : '❚❚'}
      </span>
      <span
        aria-hidden="true"
        className="max-w-0 overflow-hidden whitespace-nowrap transition-[max-width,padding] duration-500 ease-fisica group-hover/mov:max-w-[12rem] group-hover/mov:pl-2 group-focus-visible/mov:max-w-[12rem] group-focus-visible/mov:pl-2"
      >
        {pausado ? 'Retomar animações' : 'Pausar animações'}
      </span>
    </button>
  )
}
