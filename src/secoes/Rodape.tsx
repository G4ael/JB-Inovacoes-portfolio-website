import { contato } from '../dados'
import { linkWhatsapp, linkEmail, linkInstagram } from '../lib/links'

const linkClasses =
  'rotulo text-tinta underline decoration-regua-forte underline-offset-[6px] transition-colors hover:text-acento hover:decoration-acento'

export function Rodape() {
  const zap = linkWhatsapp()
  const mail = linkEmail('Orçamento de site')
  const insta = linkInstagram()
  const ano = new Date().getFullYear()

  return (
    <footer className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-16">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-[1.5rem] tracking-[-0.04em]">
            JB<span className="text-tinta-fraca"> Inovações</span>
          </p>
          <p className="rotulo mt-3 text-tinta-fraca">Sites e painéis · {ano}</p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-3">
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
