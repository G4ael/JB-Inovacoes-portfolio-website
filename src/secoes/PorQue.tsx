import { Revelar } from '../componentes/Revelar'

const motivos = [
  {
    rotulo: 'Atendimento',
    titulo: 'Você fala com quem escreve o código.',
    texto:
      'Não tem atendente no meio traduzindo o seu pedido para o time técnico. O que você falar no WhatsApp chega inteiro em quem vai mexer no site.',
  },
  {
    rotulo: 'Independência',
    titulo: 'O painel vem junto, sempre.',
    texto:
      'Os três projetos do portfólio saíram com painel de administração. Cadastrar produto, trocar preço e esconder o que acabou é trabalho do dono, não motivo para me chamar.',
  },
  {
    rotulo: 'Peso da página',
    titulo: 'As fotos são comprimidas no upload.',
    texto:
      'Quem sobe a foto do produto não precisa saber o que é WebP. O painel reduz a imagem sozinho, porque metade dos seus clientes vai abrir o site no 4G.',
  },
  {
    rotulo: 'Segurança',
    titulo: 'Cabeçalho de segurança configurado.',
    texto:
      'CSP, X-Frame-Options, Referrer-Policy e Permissions-Policy entram na publicação. É a parte que ninguém vê e quase todo mundo pula.',
  },
]

export function PorQue() {
  return (
    <section className="border-b border-regua">
      <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <Revelar className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="rotulo text-tinta-fraca">
              03 <span className="mx-2 text-regua-forte">/</span> Por que a JB
            </p>
            <h2 className="display mt-6 max-w-[12ch] text-[clamp(2rem,5.5vw,4.25rem)]">
              O que muda quando o estúdio é pequeno.
            </h2>
          </Revelar>

          <div className="lg:col-span-7 lg:col-start-6">
            {motivos.map((m) => (
              <Revelar key={m.rotulo}>
                <div className="grid gap-3 border-t border-regua py-8 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <p className="rotulo pt-1.5 text-tinta-fraca">{m.rotulo}</p>
                  <div>
                    <h3 className="display text-[1.4rem] sm:text-[1.65rem]">{m.titulo}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-tinta-media sm:text-base">
                      {m.texto}
                    </p>
                  </div>
                </div>
              </Revelar>
            ))}
            <div className="border-t border-regua" />
          </div>
        </div>
      </div>
    </section>
  )
}
