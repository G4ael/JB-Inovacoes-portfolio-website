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

- Fundo `#0A0C0B`, texto `#ECEFEA`, neon `#5CFD86` como cor de ação
- Display e texto: Space Grotesk; rótulos, números e metadados: JetBrains Mono
- Cada projeto do portfólio carrega a cor da marca do próprio cliente
  (`cor` em `src/dados.ts`): ela acende a linha ativa, o halo, os traços
  da lista e o brilho do painel de print. A cor da página vem do trabalho,
  não de uma paleta decorativa.
- Borda de campo usa `--color-campo-borda`, e não a régua decorativa:
  limite de campo precisa de 3:1 contra o fundo.

## Movimento

Tudo em CSS ligado à rolagem (`animation-timeline: view()`), dentro de
`@supports` e de `prefers-reduced-motion: no-preference`. Onde não há
suporte, o conteúdo simplesmente aparece — nunca fica preso invisível.

- `.revelar` sobe blocos inteiros
- `TextoRevelado` quebra a frase em palavras (ou letras) e dá a cada
  pedaço o próprio `animation-range`, calculado no React. É isso que
  escalona sem depender de JS em execução. No herói o gatilho é a carga
  da página (`naEntrada`), porque o bloco já nasce na tela.
- `Faixa` é a tarja rolante; pausa no hover e para com menos movimento.

## A onda de pontos (WebGL)

`src/componentes/OndaPontos.tsx` é escrito do zero — o preset "Point Waves"
do shaders.com é pago e licenciado, então nada de lá foi copiado.

A grade é um plano em fuga: o eixo Y vira profundidade e o X é
multiplicado por ela, para cada fileira cobrir a largura da tela depois
da divisão em perspectiva. As ondas são calculadas em coordenadas de
mundo, e o ponteiro injeta uma ondulação local.

Cuidados que o componente já toma sozinho:

- Sem WebGL, o canvas some e o fundo sólido assume
- `ResizeObserver` remede o canvas (na montagem ele chega a medir 0)
- Fora da tela ou com a aba escondida, o laço para
- `prefers-reduced-motion` desenha um quadro parado
- No celular a grade cai pela metade e o DPR é limitado a 1.5
- Alfa pré-multiplicado com blend aditivo: com alfa normal o compositor
  do navegador multiplicava a cor pelo alfa acumulado e a onda sumia

Dois detalhes que já custaram caro e não devem regredir: os uniformes
precisam ser reescritos toda vez que `medir()` roda (em StrictMode o
efeito roda duas vezes e o segundo programa nasce zerado), e o laço não
roda em aba sem composição — para conferir a onda, use captura headless,
não a aba embutida.

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
