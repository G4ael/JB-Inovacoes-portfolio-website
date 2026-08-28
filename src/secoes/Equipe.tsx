import { equipe } from '../dados'
import { Revelar } from '../componentes/Revelar'
import { TextoRevelado } from '../componentes/TextoRevelado'

function IconeGithub() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  )
}

/* Duas metades que entram de lados opostos e se encontram no meio.
   A animação existe para dar sentido à divisão, não para enfeitar. */
export function Equipe() {
  const primeiro = equipe[0]
  const segundo = equipe[1]

  return (
    <section id="equipe" className="scroll-mt-24 border-b border-linha bg-fundo-2">
      <div className="mx-auto max-w-[86rem] py-20 respiro-lateral sm:py-28">
        <Revelar>
          <p className="rotulo text-texto-fraco">Quem faz</p>
        </Revelar>
        <TextoRevelado
          as="h2"
          texto="Duas pessoas. Nenhuma camada no meio."
          className="display mt-6 block max-w-[14ch] text-[clamp(2rem,5.5vw,4.25rem)]"
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-linha bg-linha sm:mt-20 lg:grid-cols-2">
          {primeiro ? <Pessoa pessoa={primeiro} lado="esquerda" /> : null}

          {segundo ? (
            <Pessoa pessoa={segundo} lado="direita" />
          ) : (
            /* Metade honesta: o segundo perfil entra aqui quando existir.
               Melhor uma vaga assumida do que um card inventado. */
            <div className="metade-direita flex flex-col justify-center bg-fundo p-8 sm:p-12">
              <p className="rotulo text-texto-fraco">A outra metade</p>
              <p className="medida-texto mt-5 text-[1.05rem] leading-relaxed text-texto-medio">
                O estúdio é de duas pessoas. O segundo perfil ainda não está no GitHub, e este
                espaço fica reservado para quando estiver: nome, função e link, do mesmo jeito que o
                da esquerda.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

type PropsPessoa = {
  pessoa: (typeof equipe)[number]
  lado: 'esquerda' | 'direita'
}

function Pessoa({ pessoa, lado }: PropsPessoa) {
  const conteudo = (
    <>
      {/* Monograma: gira e acende quando a metade recebe atenção */}
      <span
        aria-hidden="true"
        className="display inline-flex h-16 w-16 items-center justify-center border border-linha-forte text-[1.35rem] text-texto-fraco transition-[transform,color,border-color,box-shadow] duration-500 ease-fisica group-hover:-rotate-6 group-hover:border-neon group-hover:text-neon group-hover:shadow-[0_0_30px_-10px_var(--color-neon)] group-focus-visible:-rotate-6 group-focus-visible:border-neon group-focus-visible:text-neon"
      >
        {pessoa.iniciais}
      </span>

      <p className="display mt-8 text-[clamp(1.9rem,4vw,3rem)] transition-colors duration-500 group-hover:text-neon">
        {pessoa.nome}
      </p>
      <p className="rotulo mt-3 text-texto-fraco">{pessoa.papel}</p>

      {pessoa.github ? (
        <span className="rotulo mt-8 inline-flex items-center gap-3 text-texto transition-colors duration-500 group-hover:text-neon">
          <IconeGithub />
          github.com/{pessoa.github.split('/').pop()}
          <span
            aria-hidden="true"
            className="transition-transform duration-500 ease-fisica group-hover:translate-x-1"
          >
            ↗
          </span>
        </span>
      ) : null}

      {/* Traço que corre a base da metade no hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-neon transition-transform duration-700 ease-fisica group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </>
  )

  const classes =
    'group relative flex flex-col justify-center bg-fundo p-8 transition-colors duration-500 hover:bg-fundo-3 sm:p-12 ' +
    (lado === 'esquerda' ? 'metade-esquerda' : 'metade-direita')

  if (!pessoa.github) {
    return <div className={classes}>{conteudo}</div>
  }

  return (
    <a
      href={pessoa.github}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      aria-label={`Perfil de ${pessoa.nome} no GitHub, abre em nova aba`}
    >
      {conteudo}
    </a>
  )
}
