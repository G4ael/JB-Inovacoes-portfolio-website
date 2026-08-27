import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variante?: 'principal' | 'contorno' | 'texto'
  tamanho?: 'normal' | 'grande'
  children: ReactNode
}

/* Cantos retos (2px). É uma decisão, não um default:
   o site inteiro evita o arredondado de meio-caminho. */
const base =
  'group/botao relative inline-flex items-center justify-center gap-2.5 overflow-hidden ' +
  'rounded-[2px] font-medium min-h-11 active:translate-y-px ' +
  'transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-fisica'

const variantes = {
  principal:
    'bg-neon text-fundo hover:bg-neon-fundo hover:shadow-[0_0_34px_-6px_var(--color-neon)]',
  contorno:
    'border border-campo-borda text-texto hover:border-neon hover:text-neon hover:shadow-[0_0_28px_-12px_var(--color-neon)]',
  texto:
    'text-texto underline decoration-linha-forte decoration-1 underline-offset-[6px] hover:decoration-neon hover:text-neon',
}

const tamanhos = {
  normal: 'px-5 py-3 text-[0.9375rem]',
  grande: 'px-7 py-4 text-base sm:text-[1.0625rem]',
}

export function Botao({ variante = 'principal', tamanho = 'normal', className = '', children, ...resto }: Props) {
  const classes =
    base +
    ' ' +
    variantes[variante] +
    ' ' +
    (variante === 'texto' ? 'px-0 py-1 min-h-0' : tamanhos[tamanho]) +
    (className ? ' ' + className : '')
  return (
    <a className={classes} {...resto}>
      {/* Varredura de luz que atravessa o botão no hover */}
      {variante !== 'texto' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-fisica group-hover/botao:translate-x-full motion-reduce:hidden"
        />
      )}
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </a>
  )
}

export function SetaWhatsapp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.86 1.2 3.05c.15.2 2.08 3.17 5.03 4.45.7.3 1.25.48 1.68.62.7.22 1.35.19 1.86.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  )
}
