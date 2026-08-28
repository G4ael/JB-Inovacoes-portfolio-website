import { contato, equipe } from '../dados'
import { linkWhatsapp, linkEmail, linkInstagram } from '../lib/links'

const linkClasses =
  'inline-flex min-h-11 items-center text-[0.9375rem] text-texto-medio transition-colors hover:text-neon'

const atalhos = [
  { href: '#projetos', texto: 'Projetos' },
  { href: '#processo', texto: 'Como trabalhamos' },
  { href: '#equipe', texto: 'Quem faz' },
  { href: '#orcamento', texto: 'Orçamento' },
]

export function Rodape() {
  const zap = linkWhatsapp()
  const mail = linkEmail('Orçamento de site')
  const insta = linkInstagram()
  const github = equipe.find((p) => p.github)?.github
  const ano = new Date().getFullYear()

  return (
    <footer className="border-t border-linha">
      <div className="mx-auto max-w-[86rem] py-14 respiro-lateral sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="display text-[1.5rem] tracking-[-0.04em]">
              JB<span className="text-texto-fraco">{' '}Inovações</span>
            </p>
            <p className="medida-texto mt-4 text-[0.9375rem] leading-relaxed text-texto-medio">
              Site e painel de administração para negócio pequeno. Depois da entrega, quem manda no
              conteúdo é o dono.
            </p>
          </div>

          <nav aria-label="Seções do site">
            <p className="rotulo text-texto-fraco">Navegar</p>
            <ul className="mt-3">
              {atalhos.map((a) => (
                <li key={a.href}>
                  <a href={a.href} className={linkClasses}>
                    {a.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="rotulo text-texto-fraco">Falar com a gente</p>
            <ul className="mt-3">
              {zap ? (
                <li>
                  <a href={zap} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    WhatsApp (47) 9 9150-0164
                  </a>
                </li>
              ) : null}
              {mail ? (
                <li>
                  <a href={mail} className={linkClasses}>
                    {contato.email}
                  </a>
                </li>
              ) : null}
              {insta ? (
                <li>
                  <a href={insta} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    {contato.instagramArroba ?? 'Instagram'}
                  </a>
                </li>
              ) : null}
              {github ? (
                <li>
                  <a href={github} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    GitHub
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-linha pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="rotulo text-texto-fraco">
            © {ano} JB Inovações · Todos os direitos reservados
          </p>
          <p className="rotulo text-texto-fraco">
            Este site foi feito pela própria JB Inovações
          </p>
        </div>
      </div>
    </footer>
  )
}
