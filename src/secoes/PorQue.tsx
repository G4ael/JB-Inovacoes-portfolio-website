import { Revelar } from '../componentes/Revelar'
import { TextoRevelado } from '../componentes/TextoRevelado'

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
    <section className="border-b border-linha">
      <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Revelar>
              <p className="rotulo text-texto-fraco">
                03 <span aria-hidden="true" className="mx-2 text-texto-fraco">/</span> Por que a JB
              </p>
            </Revelar>
            <TextoRevelado
              as="h2"
              texto="O que muda quando o estúdio é pequeno."
              className="display mt-6 block max-w-[12ch] text-[clamp(2rem,5.5vw,4.25rem)]"
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {motivos.map((m) => (
              <Revelar key={m.rotulo}>
                <div className="group grid gap-3 border-t border-linha py-8 transition-colors duration-500 hover:border-neon/45 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <p className="rotulo pt-1.5 text-texto-fraco transition-colors duration-500 group-hover:text-neon">
                    {m.rotulo}
                  </p>
                  <div>
                    <h3 className="display text-[1.4rem] sm:text-[1.65rem]">{m.titulo}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-texto-medio sm:text-base">
                      {m.texto}
                    </p>
                  </div>
                </div>
              </Revelar>
            ))}
            <div className="border-t border-linha" />
          </div>
        </div>
      </div>
    </section>
  )
}
