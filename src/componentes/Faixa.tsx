const itens = [
  'Loja online',
  'Painel de administração',
  'Mostruário',
  'Catálogo',
  'Site institucional',
  'Cabeçalho de segurança',
  'Publicação na Vercel',
]

/* Faixa rolante do que a JB entrega. Duplicada uma vez para o laço
   emendar sem salto. Pausa no hover e para de vez para quem pediu
   menos movimento — o texto continua legível parado. */
export function Faixa() {
  return (
    <div className="faixa overflow-hidden border-b border-linha bg-fundo-2/60 py-4">
      <div className="faixa-trilho" aria-hidden="true">
        {[0, 1].map((volta) => (
          <ul key={volta} className="flex shrink-0 items-center">
            {itens.map((item) => (
              <li key={item} className="flex items-center gap-8 px-8">
                <span className="rotulo whitespace-nowrap text-texto-medio">{item}</span>
                <span className="inline-block h-1 w-1 rounded-full bg-neon" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className="sr-only">
        A JB Inovações entrega: {itens.join(', ').toLowerCase()}.
      </p>
    </div>
  )
}
