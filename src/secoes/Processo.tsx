import { etapas } from '../dados'
import { Revelar } from '../componentes/Revelar'
import { TextoRevelado } from '../componentes/TextoRevelado'

/* Faixa de superfície mais clara com grade de pontos ao fundo:
   é a quebra de ritmo entre o portfólio e o método, agora que a
   página inteira é escura. */
export function Processo() {
  return (
    <section id="processo" className="relative scroll-mt-24 overflow-hidden border-b border-linha bg-fundo-2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(var(--color-linha-forte)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
      />

      <div className="relative mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Revelar>
              <p className="rotulo text-texto-fraco">
                02 <span aria-hidden="true" className="mx-2 text-texto-fraco">/</span> Como trabalhamos
              </p>
            </Revelar>

            <TextoRevelado
              as="h2"
              texto="Quatro etapas. Você aprova vendo."
              className="display mt-6 block max-w-[11ch] text-[clamp(2rem,5.5vw,4.25rem)]"
            />

            <Revelar>
              <span
                aria-hidden="true"
                className="risca mt-8 block h-px w-24 bg-neon"
              />
              <p className="medida-texto mt-8 text-texto-medio">
                Ninguém aqui pede para você imaginar como vai ficar. A tela existe antes do código, e
                a aprovação é em cima dela.
              </p>
            </Revelar>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {etapas.map((e) => (
              <Revelar as="li" key={e.numero}>
                <div className="group flex gap-6 border-t border-linha py-8 sm:gap-10">
                  {/* Número grande como elemento gráfico, não como enfeite de card */}
                  <span
                    aria-hidden="true"
                    className="display shrink-0 text-[clamp(2rem,4vw,3.25rem)] leading-none text-linha-forte transition-colors duration-500 group-hover:text-neon"
                  >
                    {e.numero}
                  </span>
                  <div>
                    <h3 className="display text-[1.5rem] sm:text-[1.75rem]">{e.titulo}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-texto-medio sm:text-base">
                      {e.texto}
                    </p>
                  </div>
                </div>
              </Revelar>
            ))}
            <div className="border-t border-linha" />
          </ol>
        </div>
      </div>
    </section>
  )
}
