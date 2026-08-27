import { contato } from '../dados'

/** Monta o link do WhatsApp já com a mensagem escrita.
 *  Retorna null quando o número ainda não foi configurado,
 *  para o botão sumir em vez de virar link quebrado. */
export function linkWhatsapp(mensagem?: string): string | null {
  if (!contato.whatsapp) return null
  const texto = encodeURIComponent(mensagem ?? contato.whatsappMensagem)
  return 'https://wa.me/' + contato.whatsapp + '?text=' + texto
}

export function linkEmail(assunto?: string, corpo?: string): string | null {
  if (!contato.email) return null
  const partes: string[] = []
  if (assunto) partes.push('subject=' + encodeURIComponent(assunto))
  if (corpo) partes.push('body=' + encodeURIComponent(corpo))
  return 'mailto:' + contato.email + (partes.length ? '?' + partes.join('&') : '')
}

export function linkInstagram(): string | null {
  if (!contato.instagram) return null
  return 'https://instagram.com/' + contato.instagram.replace('@', '')
}
