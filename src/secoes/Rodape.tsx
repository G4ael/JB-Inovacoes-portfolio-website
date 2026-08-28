import { contato } from '../dados'
import { linkWhatsapp, linkEmail, linkInstagram } from '../lib/links'

const linkClasses =
  'rotulo inline-flex min-h-11 items-center text-texto underline decoration-linha-forte underline-offset-[6px] transition-colors hover:text-neon hover:decoration-neon'

export function Rodape() {
  const zap = linkWhatsapp()
  const mail = linkEmail('Orçamento de site')
  const insta = linkInstagram()
  const ano = new Date().getFullYear()

  return (
    <footer className="mx-auto max-w-[86rem] py-14 respiro-lateral sm:py-16">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-[1.5rem] tracking-[-0.04em]">
            JB{' '}<span className="text-texto-fraco">Inovações</span>
          </p>
          <p className="rotulo mt-3 text-texto-fraco">Sites e painéis · {ano}</p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-1">
          {zap && (
            <li>
              <a href={zap} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                WhatsApp
              </a>
            </li>
          )}
          {mail && (
            <li>
              <a href={mail} className={linkClasses}>
                {contato.email}
              </a>
            </li>
          )}
          {insta && (
            <li>
              <a href={insta} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                {contato.instagramArroba ?? 'Instagram'}
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  )
}
