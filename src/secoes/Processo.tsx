import { etapas } from '../dados'
import { Revelar } from '../componentes/Revelar'

/* Seção invertida: tinta no fundo, papel no texto.
   É o respiro do ritmo da página, e marca a virada de portfólio para método. */
export function Processo() {
  return (
    <section id="processo" className="bg-tinta text-papel scroll-mt-16">
      <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <Revelar className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="rotulo text-papel/55">
              02 <span aria-hidden="true" className="mx-2 text-papel/55">/</span> Como trabalhamos
            </p>
            <h2 className="display mt-6 max-w-[11ch] text-[clamp(2rem,5.5vw,4.25rem)]">
              Quatro etapas. Você aprova vendo.
            </h2>
            <p className="medida-texto mt-6 text-papel/70">
              Ninguém aqui pede para você imaginar como vai ficar. A tela existe antes do código, e
              a aprovação é em cima dela.
            </p>
          </Revelar>

          <ol className="lg:col-span-6 lg:col-start-7">
            {etapas.map((e) => (
              <Revelar as="li" key={e.numero}>
                <div className="flex gap-6 border-t border-papel/15 py-8 sm:gap-10">
                  {/* Número grande como elemento gráfico, não como enfeite de card */}
                  <span
                    aria-hidden="true"
                    className="display shrink-0 text-[clamp(2rem,4vw,3.25rem)] leading-none text-papel/25"
                  >
                    {e.numero}
                  </span>
                  <div>
                    <h3 className="display text-[1.5rem] sm:text-[1.75rem]">{e.titulo}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-papel/70 sm:text-base">
                      {e.texto}
                    </p>
                  </div>
                </div>
              </Revelar>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
