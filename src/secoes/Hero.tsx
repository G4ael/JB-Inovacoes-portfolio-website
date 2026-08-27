import { Botao, SetaWhatsapp } from '../componentes/Botao'
import { linkWhatsapp } from '../lib/links'
import { projetos } from '../dados'

export function Hero() {
  const zap = linkWhatsapp()

  return (
    <section id="topo" className="relative border-b border-regua">
      <div className="mx-auto max-w-[86rem] px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24">
        <p className="rotulo mb-10 flex items-center gap-3 text-tinta-fraca sm:mb-14">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-acento" aria-hidden="true" />
          Estúdio de sites e painéis
        </p>

        {/* Headline como elemento gráfico: peso 400 em corpo grande,
            tracking negativo. Não é negrito de landing page. */}
        <h1 className="display max-w-[16ch] text-[clamp(2.6rem,8.5vw,7rem)] sm:max-w-[15ch]">
          O site que o seu cliente abre antes de decidir se liga.
        </h1>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="medida-texto text-[1.0625rem] leading-relaxed text-tinta-media sm:text-lg">
              A JB Inovações desenvolve site e painel de administração para negócio pequeno: loja,
              mostruário, catálogo. Depois da entrega você troca preço, foto e produto sozinho, sem
              abrir chamado com programador.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Botao href="#projetos" variante="contorno" tamanho="grande">
                Ver projetos
              </Botao>
              {zap && (
                <Botao href={zap} target="_blank" rel="noopener noreferrer" tamanho="grande">
                  <SetaWhatsapp />
                  Pedir orçamento
                </Botao>
              )}
            </div>
          </div>

          {/* Índice dos setores atendidos — assimétrico, encostado à direita */}
          <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <p className="rotulo mb-4 text-tinta-fraca">Projetos</p>
            <ul className="border-t border-regua">
              {projetos.map((p) => (
                <li
                  key={p.id}
                  className="flex items-baseline justify-between gap-6 border-b border-regua py-2.5"
                >
                  <span className="text-[0.9375rem] text-tinta">{p.nome}</span>
                  <span className="rotulo shrink-0 text-tinta-fraca">{p.numero}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
