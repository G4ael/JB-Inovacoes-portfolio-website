import { Botao, SetaWhatsapp } from '../componentes/Botao'
import { OndaPontosLazy } from '../componentes/OndaPontosLazy'
import { TextoRevelado } from '../componentes/TextoRevelado'
import { linkWhatsapp } from '../lib/links'
import { projetos } from '../dados'

export function Hero() {
  const zap = linkWhatsapp()

  return (
    <section id="topo" className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden border-b border-linha">
      {/* Onda de pontos em WebGL. Segue o ponteiro e some sozinha
          onde não há suporte — o fundo sólido assume. */}
      <div className="absolute inset-0 -z-10">
        <OndaPontosLazy cor="#5cfd86" />
        {/* Máscara para o texto nunca disputar leitura com a onda */}
        {/* Duas máscaras, cada uma com um trabalho: a de cima limpa a
            área da manchete, a lateral abre espaço para o texto à
            esquerda. A onda fica inteira no canto inferior direito. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[46%] bg-linear-to-b from-fundo via-fundo/88 to-transparent" />
        <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-fundo from-4% via-fundo/50 via-46% to-transparent sm:block" />
        {/* No celular não existe "lado livre": a máscara vira um véu
            uniforme, senão a onda passa por cima do parágrafo. */}
        <div className="pointer-events-none absolute inset-0 bg-fundo/62 sm:hidden" />
      </div>

      <div className="relative mx-auto w-full max-w-[86rem] pt-24 pb-16 respiro-lateral sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <p className="rotulo mb-10 flex items-center gap-3 text-texto-medio sm:mb-14">
          <span className="relative inline-flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-neon opacity-70 motion-reduce:hidden" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-neon" />
          </span>
          Estúdio de sites e painéis
        </p>

        {/* As letras sobem por trás de uma máscara, uma depois da outra.
            No herói o gatilho é a carga da página, não a rolagem —
            o bloco já nasce na tela e nunca "entraria" nela. */}
        <TextoRevelado
          as="h1"
          texto="O site que o seu cliente abre antes de decidir se liga."
          porLetra
          naEntrada
          passo={17}
          className="display max-w-[16ch] text-[clamp(2.6rem,8.5vw,7rem)] sm:max-w-[15ch]"
        />

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="medida-texto text-[1.0625rem] leading-relaxed text-texto-medio sm:text-lg">
              A JB Inovações desenvolve site e painel de administração para negócio pequeno: loja,
              mostruário, catálogo. Depois da entrega você troca preço, foto e produto sozinho, sem
              abrir chamado com programador.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {zap && (
                <Botao href={zap} target="_blank" rel="noopener noreferrer" tamanho="grande">
                  <SetaWhatsapp />
                  Pedir orçamento
                </Botao>
              )}
              <Botao href="#projetos" variante="contorno" tamanho="grande">
                Ver projetos
              </Botao>
            </div>
          </div>

          {/* Índice dos projetos — cada linha acende na cor do cliente */}
          {/* Painel translúcido: a onda passa por trás, mas os nomes
              continuam legíveis por cima dela. */}
          <div className="rounded-[2px] bg-fundo/72 p-5 backdrop-blur-[3px] sm:-m-5 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <p className="rotulo mb-4 text-texto-fraco">Projetos</p>
            <ul className="border-t border-linha">
              {projetos.map((p) => (
                <li key={p.id} className="border-b border-linha">
                  <a
                    href="#projetos"
                    style={{ '--cor-projeto': p.cor } as React.CSSProperties}
                    className="group flex min-h-11 items-baseline justify-between gap-6 py-2.5"
                  >
                    <span className="text-[0.9375rem] text-texto transition-colors duration-300 group-hover:text-(--cor-projeto)">
                      {p.nome}
                    </span>
                    <span
                      aria-hidden="true"
                      className="rotulo shrink-0 text-texto-fraco transition-colors duration-300 group-hover:text-(--cor-projeto)"
                    >
                      {p.numero}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
