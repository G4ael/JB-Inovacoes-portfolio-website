import { useEffect, useRef, useState } from 'react'
import { projetos } from '../dados'
import { Revelar } from '../componentes/Revelar'

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
    <section id="projetos" className="border-b border-regua scroll-mt-24">
      <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-28">
        <Revelar>
          <p className="rotulo text-tinta-fraca">
            01 <span aria-hidden="true" className="mx-2 text-tinta-fraca">/</span> Projetos
          </p>
          <h2 className="display mt-6 max-w-[13ch] text-[clamp(2rem,5.5vw,4.25rem)]">
            O trabalho, não a promessa.
          </h2>
          <p className="medida-texto mt-6 text-tinta-media">
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
                  className={
                    'group relative border-t border-regua py-9 pl-5 transition-colors duration-500 sm:pl-7 ' +
                    (i === projetos.length - 1 ? 'border-b' : '')
                  }
                >
                  {/* Marca de linha ativa: a única aparição do acento aqui */}
                  <span
                    aria-hidden="true"
                    className={
                      'absolute left-0 top-0 w-[2px] bg-acento transition-[height] duration-500 ease-fisica ' +
                      (estaAtivo ? 'h-full' : 'h-0')
                    }
                  />
                  <Revelar>
                    <div className="flex items-baseline gap-4">
                      <span
                        className={
                          'rotulo transition-colors duration-300 ' +
                          (estaAtivo ? 'text-acento' : 'text-tinta-fraca')
                        }
                      >
                        {p.numero}
                      </span>
                      <h3 className="display text-[clamp(1.7rem,3.6vw,2.9rem)]">{p.nome}</h3>
                    </div>

                    <p className="rotulo mt-3 ml-[2.6rem] text-tinta-fraca">{p.setor}</p>

                    <div className="mt-5 ml-0 sm:ml-[2.6rem]">
                      <p className="medida-texto text-tinta-media">{p.contexto}</p>

                      {/* Imagem no fluxo — é assim que o celular vê o projeto */}
                      <figure className="mt-7 lg:hidden">
                        <img
                          src={p.imagemPequena}
                          width={800}
                          height={500}
                          loading="lazy"
                          decoding="async"
                          alt={p.alt}
                          className="w-full border border-regua-forte bg-papel-fundo"
                        />
                      </figure>

                      <ul className="mt-7 grid gap-y-2 border-t border-regua pt-5 sm:grid-cols-2 sm:gap-x-8">
                        {p.entregue.map((item) => (
                          <li key={item} className="flex gap-2.5 text-[0.9375rem] text-tinta-media">
                            <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-regua-forte" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rotulo mt-6 inline-flex items-center gap-2 text-tinta underline decoration-regua-forte underline-offset-[6px] transition-colors hover:text-acento hover:decoration-acento"
                        >
                          Abrir o site
                          <span aria-hidden="true">↗</span>
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
            <div className="sticky top-24">
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-regua-forte bg-papel-fundo">
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
                      'absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-fisica ' +
                      (ativo === p.id ? 'opacity-100' : 'opacity-0')
                    }
                  />
                ))}
              </div>
              <p className="rotulo mt-4 text-tinta-fraca">
                {projetoAtivo.nome} <span aria-hidden="true" className="mx-2 text-tinta-fraca">/</span> tela inicial
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
