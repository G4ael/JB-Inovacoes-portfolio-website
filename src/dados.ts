/* ============================================================
   DADOS DO SITE — o único arquivo que precisa ser editado
   para mudar texto, links e contatos.

   Nada aqui pode ser inventado: número, link ou depoimento só
   entra depois de confirmado. Campo vazio (null) some do site
   em vez de virar link quebrado.
   ============================================================ */

export const contato = {
  /* Só dígitos, com DDI 55. Ex.: '5547991500164' */
  whatsapp: '5547991500164' as string | null,
  /* Mensagem que já vai escrita quando a pessoa abre a conversa */
  whatsappMensagem: 'Oi! Vi o site de vocês e queria um orçamento para o meu site.',
  email: null as string | null,
  instagram: null as string | null,
  /* Nome de exibição do Instagram, ex.: '@jbinovacoes' */
  instagramArroba: null as string | null,
}

export type Projeto = {
  id: string
  numero: string
  nome: string
  setor: string
  /** Cor da marca do próprio cliente. É ela que tinge a linha ativa
   *  do portfólio e a onda do fundo — a cor da página vem do trabalho. */
  cor: string
  contexto: string
  entregue: string[]
  link: string | null
  imagem: string
  imagemPequena: string
  alt: string
}

export const projetos: Projeto[] = [
  {
    id: 'servigas',
    numero: '01',
    nome: 'Servigás Aquecedores',
    setor: 'Venda e instalação de aquecedores a gás',
    cor: '#F2600C',
    contexto:
      'A loja online não fica sozinha: o catálogo dela sai do mesmo sistema onde a Servigás controla vendas, estoque e clientes. Cadastrou um aquecedor lá dentro, ele aparece no site na mesma hora.',
    entregue: [
      'Loja com busca, categorias e carrinho',
      'Sistema interno de vendas, estoque e clientes',
      'Até 4 fotos por produto, comprimidas no upload',
      'Preço em branco vira “sob consulta” com botão de orçamento',
    ],
    link: 'https://servigas-loja.vercel.app',
    imagem: '/projetos/servigas.webp',
    imagemPequena: '/projetos/servigas-800.webp',
    alt: 'Página inicial da loja Servigás Aquecedores, com barra de categorias à esquerda e vitrine de aquecedores a gás.',
  },
  {
    id: 'forja3d',
    numero: '02',
    nome: 'Forja 3D',
    setor: 'Peças impressas em 3D sob encomenda',
    cor: '#8B7CF6',
    contexto:
      'Impressão 3D tem um problema de preço: a mesma peça custa diferente em P, M e G. O catálogo calcula isso sozinho e ainda soma a pintura à mão quando o cliente marca a opção.',
    entregue: [
      'Catálogo por categoria, favoritos e carrinho',
      'Preço que muda conforme a escala da peça',
      'Pedido de peça personalizada por foto de referência',
      'Painel interno para trocar modelos e preços',
    ],
    link: 'https://forja-3d-loja.vercel.app',
    imagem: '/projetos/forja3d.webp',
    imagemPequena: '/projetos/forja3d-800.webp',
    alt: 'Página inicial da loja Forja 3D, em tema escuro, com catálogo de modelos impressos em 3D.',
  },
  {
    id: 'marcenaria',
    numero: '03',
    nome: 'Marcenaria Bom Madeiro',
    setor: 'Móveis sob medida',
    cor: '#C89B6D',
    contexto:
      'Marcenaria vende pelo olho: o cliente quer ver o armário pronto antes de pedir orçamento. O mostruário virou o catálogo da oficina, e quem edita as fotos é o próprio marceneiro, pelo painel.',
    entregue: [
      'Mostruário por ambiente, com foto em tela cheia',
      'Painel de administração para trocar as peças',
      'Botão de orçamento que já abre o WhatsApp',
    ],
    link: 'https://mostruario-marcenaria.vercel.app',
    imagem: '/projetos/marcenaria.webp',
    imagemPequena: '/projetos/marcenaria-800.webp',
    alt: 'Página inicial do mostruário da Marcenaria Bom Madeiro, em tons de madeira escura, com chamada para ver o mostruário.',
  },
]

export const etapas = [
  {
    numero: '01',
    titulo: 'Conversa',
    texto:
      'Meia hora no WhatsApp ou na chamada resolve: o que você vende, quem compra, o que hoje trava a venda. Sem briefing de dez páginas.',
  },
  {
    numero: '02',
    titulo: 'Desenho da tela',
    texto:
      'Você recebe a tela desenhada antes de existir código. É mais barato mudar de ideia aqui do que depois, e você aprova vendo, não imaginando.',
  },
  {
    numero: '03',
    titulo: 'Construção',
    texto:
      'O site é montado junto com o painel de administração, porque um sem o outro te deixa dependente. Testado no celular durante, não no fim.',
  },
  {
    numero: '04',
    titulo: 'Entrega e chave na mão',
    texto:
      'Publicamos, conectamos o WhatsApp e te ensinamos a mexer no painel. Fica um passo a passo escrito na pasta do projeto para quando a memória falhar.',
  },
]

/* Quem toca o estúdio. Entrada sem `nome` não é renderizada — vale a
   mesma regra do resto do arquivo: nada de pessoa inventada. */
export type Pessoa = {
  id: string
  nome: string
  papel: string
  github: string | null
  /** Duas iniciais para o monograma quando não há foto. */
  iniciais: string
}

export const equipe: Pessoa[] = [
  {
    id: 'gael',
    nome: 'G4ael',
    papel: 'Interface e código',
    github: 'https://github.com/G4ael',
    iniciais: 'GA',
  },
]
