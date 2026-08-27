import { useId, useState, type FormEvent } from 'react'
import { contato } from '../dados'
import { linkWhatsapp, linkEmail } from '../lib/links'
import { Botao, SetaWhatsapp } from '../componentes/Botao'
import { Revelar } from '../componentes/Revelar'

export function Contato() {
  const idNome = useId()
  const idProjeto = useId()
  const [nome, setNome] = useState('')
  const [projeto, setProjeto] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  const zap = linkWhatsapp()
  const temEmail = Boolean(contato.email)
  const temCanal = temEmail || Boolean(contato.whatsapp)
  const destino = temEmail ? 'e-mail' : 'WhatsApp'

  function enviar(ev: FormEvent) {
    ev.preventDefault()
    if (!nome.trim() || !projeto.trim()) {
      setErro('Preencha o nome e a descrição para eu saber com quem falo e sobre o quê.')
      return
    }
    setErro(null)
    const corpo = `Nome: ${nome.trim()}

Projeto:
${projeto.trim()}`
    const alvo = temEmail
      ? linkEmail(`Orçamento de site — ${nome.trim()}`, corpo)
      : linkWhatsapp(corpo)
    if (alvo) window.location.href = alvo
  }

  return (
    <section id="orcamento" className="border-b border-regua scroll-mt-24">
      <div className="mx-auto max-w-[86rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-14">
          <Revelar className="lg:col-span-6">
            <p className="rotulo text-tinta-fraca">
              04 <span className="mx-2 text-regua-forte">/</span> Orçamento
            </p>
            <h2 className="display mt-6 max-w-[13ch] text-[clamp(2rem,5.5vw,4.25rem)]">
              Conta o que você vende. Eu respondo com prazo e preço.
            </h2>
            <p className="medida-texto mt-6 text-tinta-media">
              Não precisa chegar com o projeto pronto na cabeça. Duas linhas sobre o negócio já
              bastam para eu dizer se faz sentido e quanto custa.
            </p>

            {zap && (
              <div className="mt-9">
                <Botao href={zap} target="_blank" rel="noopener noreferrer" tamanho="grande">
                  <SetaWhatsapp />
                  Falar no WhatsApp
                </Botao>
                <p className="rotulo mt-4 text-tinta-fraca">Resposta no horário comercial</p>
              </div>
            )}
          </Revelar>

          {/* Alternativa para quem não quer entregar o número */}
          <Revelar className="lg:col-span-5 lg:col-start-8">
            <form onSubmit={enviar} noValidate className="border-t border-regua pt-8">
              <p className="rotulo text-tinta-fraca">Ou escreva por aqui</p>

              <div className="mt-7">
                <label htmlFor={idNome} className="rotulo block text-tinta-media">
                  Seu nome
                </label>
                <input
                  id={idNome}
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-2.5 min-h-11 w-full rounded-[2px] border border-regua-forte bg-transparent px-3.5 py-2.5 text-base text-tinta transition-colors placeholder:text-tinta-fraca/70 focus:border-acento focus:outline-none"
                  placeholder="Como te chamo"
                />
              </div>

              <div className="mt-6">
                <label htmlFor={idProjeto} className="rotulo block text-tinta-media">
                  O que você precisa
                </label>
                <textarea
                  id={idProjeto}
                  name="projeto"
                  rows={5}
                  value={projeto}
                  onChange={(e) => setProjeto(e.target.value)}
                  className="mt-2.5 w-full resize-y rounded-[2px] border border-regua-forte bg-transparent px-3.5 py-2.5 text-base leading-relaxed text-tinta transition-colors placeholder:text-tinta-fraca/70 focus:border-acento focus:outline-none"
                  placeholder="Ex.: tenho uma loja de piso e quero um catálogo que eu mesmo atualize"
                />
              </div>

              {erro && (
                <p role="alert" className="mt-4 flex gap-2 text-[0.9375rem] text-acento">
                  <span aria-hidden="true">↳</span>
                  {erro}
                </p>
              )}

              <button
                type="submit"
                disabled={!temCanal}
                className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-[2px] border border-tinta px-6 py-3.5 text-[0.9375rem] font-medium text-tinta transition-colors duration-200 hover:bg-tinta hover:text-papel disabled:cursor-not-allowed disabled:border-regua-forte disabled:text-tinta-fraca disabled:hover:bg-transparent disabled:hover:text-tinta-fraca sm:w-auto"
              >
                Enviar por {destino}
              </button>
              <p className="rotulo mt-4 text-tinta-fraca">
                {temCanal
                  ? 'Abre o seu ' + destino + ' com a mensagem já escrita'
                  : 'Canal de contato ainda não configurado em src/dados.ts'}
              </p>
            </form>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
