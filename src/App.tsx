import { Cabecalho } from './secoes/Cabecalho'
import { Hero } from './secoes/Hero'
import { Portfolio } from './secoes/Portfolio'
import { Processo } from './secoes/Processo'
import { PorQue } from './secoes/PorQue'
import { Contato } from './secoes/Contato'
import { Rodape } from './secoes/Rodape'

export default function App() {
  return (
    <>
      <a
        href="#projetos"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[2px] focus:bg-tinta focus:px-4 focus:py-2 focus:text-papel"
      >
        Pular para os projetos
      </a>
      <Cabecalho />
      <main>
        <Hero />
        <Portfolio />
        <Processo />
        <PorQue />
        <Contato />
      </main>
      <Rodape />
    </>
  )
}
