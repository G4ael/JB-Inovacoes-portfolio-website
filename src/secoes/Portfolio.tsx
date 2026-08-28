import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { projetos } from '../dados'
import { Revelar } from '../componentes/Revelar'
import { TextoRevelado } from '../componentes/TextoRevelado'

export function Portfolio() {
  const [ativo, setAtivo] = useState(projetos[0].id)
  const projetoAtivo = projetos.find((p) => p.id === ativo) ?? projetos[0]
  const refs = useRef<Record<string, HTMLLIElement | null>>({})

  /* No desktop o painel da direita acompanha a linha que está no meio da tela.
     Sem isso, quem só rola (e não passa o mouse) nunca vê a troca. */
  useEffect(() => {
    if (window.matchMedia('(max-width: 1023px)').matches) return
    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visivel) setAtivo(visivel.target.getAttribute('data-id') || projetos[0].id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    Object.values(refs.current).forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projetos" className="scroll-mt-24 border-b border-linha">
      <div className="mx-auto max-w-[86rem] py-20 respiro-lateral sm:py-28">
        <Revelar>
          <p className="rotulo text-texto-fraco">
            01 <span aria-hidden="true" className="mx-2 text-texto-fraco">/</span> Projetos
          </p>
        </Revelar>

        <TextoRevelado
          as="h2"
          texto="O trabalho, não a promessa."
          className="display mt-6 block max-w-[13ch] text-[clamp(2rem,5.5vw,4.25rem)]"
        />

        <Revelar>
          <p className="medida-texto mt-6 text-texto-medio">
            Os três sites abaixo estão com os donos. Eles cadastram produto, mudam preço e trocam
            foto pelo painel, sem passar por mim.
          </p>
        </Revelar>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-14">
          <ol className="lg:col-span-6 xl:col-span-7">
            {projetos.map((p, i) => {
              const estaAtivo = ativo === p.id
              return (
                <li
                  key={p.id}
                  data-id={p.id}
                  ref={(el) => {
                    refs.current[p.id] = el
                  }}
                  onMouseEnter={() => setAtivo(p.id)}
                  onFocus={() => setAtivo(p.id)}
                  style={{ '--cor-projeto': p.cor } as CSSProperties}
                  className={
                    'group relative border-t border-linha py-9 pl-5 transition-colors duration-500 sm:pl-7 ' +
                    (i === projetos.length - 1 ? 'border-b' : '')
                  }
                >
                  {/* Marca de linha ativa, na cor da marca do cliente */}
                  <span
                    aria-hidden="true"
                    className={
                      'absolute left-0 top-0 h-full w-[2px] origin-top bg-(--cor-projeto) transition-transform duration-500 ease-fisica ' +
                      (estaAtivo ? 'scale-y-100' : 'scale-y-0')
                    }
                  />
                  {/* Halo que acende só na linha ativa */}
                  <span
                    aria-hidden="true"
                    className={
                      'pointer-events-none absolute inset-y-0 left-0 w-40 transition-opacity duration-700 ' +
                      'bg-linear-to-r from-(--cor-projeto)/12 to-transparent ' +
                      (estaAtivo ? 'opacity-100' : 'opacity-0')
                    }
                  />

                  <Revelar>
                    <div className="relative flex items-baseline gap-4">
                      <span
                        className={
                          'rotulo transition-colors duration-300 ' +
                          (estaAtivo ? 'text-(--cor-projeto)' : 'text-texto-fraco')
                        }
                      >
                        {p.numero}
                      </span>
                      <h3
                        className={
                          'display text-[clamp(1.7rem,3.6vw,2.9rem)] transition-colors duration-300 ' +
                          (estaAtivo ? 'text-(--cor-projeto)' : 'text-texto')
                        }
                      >
                        {p.nome}
                      </h3>
                    </div>

                    <p className="rotulo relative mt-3 ml-[2.6rem] text-texto-fraco">{p.setor}</p>

                    <div className="relative mt-5 ml-0 sm:ml-[2.6rem]">
                      <p className="medida-texto text-texto-medio">{p.contexto}</p>

                      {/* Imagem no fluxo — é assim que o celular vê o projeto */}
                      <figure className="mt-7 lg:hidden">
                        <img
                          src={p.imagemPequena}
                          width={800}
                          height={500}
                          loading="lazy"
                          decoding="async"
                          alt={p.alt}
                          className="w-full border border-linha-forte bg-fundo-2"
                        />
                      </figure>

                      <ul className="mt-7 grid gap-y-2 border-t border-linha pt-5 sm:grid-cols-2 sm:gap-x-8">
                        {p.entregue.map((item) => (
                          <li key={item} className="flex gap-2.5 text-[0.9375rem] text-texto-medio">
                            <span
                              aria-hidden="true"
                              className={
                                'mt-2.5 h-px w-3 shrink-0 transition-colors duration-500 ' +
                                (estaAtivo ? 'bg-(--cor-projeto)' : 'bg-linha-forte')
                              }
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rotulo mt-6 inline-flex min-h-11 items-center gap-2 text-texto underline decoration-linha-forte underline-offset-[6px] transition-colors hover:text-(--cor-projeto) hover:decoration-(--cor-projeto)"
                        >
                          Abrir o site
                          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                            ↗
                          </span>
                        </a>
                      )}
                    </div>
                  </Revelar>
                </li>
              )
            })}
          </ol>

          {/* Painel fixo: troca de print conforme a linha ativa. Só no desktop. */}
          <div className="hidden lg:col-span-6 lg:block xl:col-span-5">
            <div
              className="sticky top-24"
              style={{ '--cor-projeto': projetoAtivo.cor } as CSSProperties}
            >
              <div className="relative aspect-16/10 w-full overflow-hidden border border-linha-forte bg-fundo-2 transition-shadow duration-700 shadow-[0_0_60px_-24px_var(--cor-projeto)]">
                {projetos.map((p) => (
                  <img
                    key={p.id}
                    src={p.imagem}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    alt={p.alt}
                    aria-hidden={ativo !== p.id}
                    className={
                      'absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-700 ease-fisica ' +
                      (ativo === p.id ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0')
                    }
                  />
                ))}
              </div>
              <p className="rotulo mt-4 flex items-center gap-2 text-texto-fraco">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-(--cor-projeto) transition-colors duration-500"
                />
                {projetoAtivo.nome}
                <span aria-hidden="true" className="text-texto-fraco">/</span>
                tela inicial
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
