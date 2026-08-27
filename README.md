# Site da JB Inovações

Site de portfólio. Vite + React + TypeScript + Tailwind v4.

## Rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5177`.

Para gerar a versão publicável: `npm run build` (sai em `dist/`).

## O que editar

Quase tudo o que muda no dia a dia está em **`src/dados.ts`**: contatos,
projetos do portfólio e as etapas do processo. Regra da casa: campo sem
valor confirmado fica `null`, e o site esconde o item em vez de mostrar
link quebrado ou número falso.

Faltam preencher no `contato`:

- `whatsapp` — só dígitos, com o 55 na frente. Ex.: `'5547991500164'`
- `email`
- `instagram` e `instagramArroba`

Enquanto o WhatsApp estiver `null`, os botões de WhatsApp somem e o
formulário fica desabilitado.

Nos projetos falta o `link` de cada um (o endereço público). Sem ele, o
botão "Abrir o site" não aparece naquele projeto.

## Identidade visual

Os tokens ficam no bloco `@theme` de `src/estilo.css`. Trocar a identidade
inteira é trocar aqueles valores.

- Papel `#EFEBE0`, tinta `#131210`, acento ultramarino `#1F3BE8`
- Display: Bricolage Grotesque em peso 400, tracking `-0.035em`
- Texto: Schibsted Grotesk
- O acento aparece no botão principal, na linha ativa do portfólio e no
  foco de teclado. Em mais lugares que isso ele deixa de destacar.

A revelação na rolagem é CSS puro (`.revelar`, com `animation-timeline: view()`).
Onde o navegador não suporta, o conteúdo simplesmente aparece — nunca fica
preso invisível.

## Prints do portfólio

`public/projetos/` guarda os prints reais das telas iniciais dos três sites,
em WebP (1600px e 800px). São capturas de verdade, sem moldura de celular.
Para atualizar, tire o print novo, converta para WebP nos dois tamanhos e
substitua mantendo o nome do arquivo.

## Publicação

`vercel.json` já vai com CSP, HSTS, `X-Frame-Options`, `nosniff`,
`Referrer-Policy` e `Permissions-Policy`. Se um dia entrar script de
terceiro (analytics, pixel), a CSP precisa ser ajustada junto — hoje ela
só libera as fontes do Google.
