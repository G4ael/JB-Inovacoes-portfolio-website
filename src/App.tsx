import { Cabecalho } from './secoes/Cabecalho'
import { Hero } from './secoes/Hero'
import { Portfolio } from './secoes/Portfolio'
import { Faixa } from './componentes/Faixa'
import { Processo } from './secoes/Processo'
import { PorQue } from './secoes/PorQue'
import { Equipe } from './secoes/Equipe'
import { Contato } from './secoes/Contato'
import { Rodape } from './secoes/Rodape'
import { ControleMovimento } from './componentes/ControleMovimento'

export default function App() {
  return (
    <>
      <a
        href="#projetos"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[2px] focus:bg-neon focus:px-4 focus:py-2 focus:text-fundo"
      >
        Pular para os projetos
      </a>
      <Cabecalho />
      <main>
        <Hero />
        <Portfolio />
        <Faixa />
        <Processo />
        <PorQue />
        <Equipe />
        <Contato />
      </main>
      <Rodape />
      <ControleMovimento />
    </>
  )
}
