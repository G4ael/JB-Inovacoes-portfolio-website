import { useId, useRef, useState, type FormEvent } from 'react'
import { contato } from '../dados'
import { linkWhatsapp, linkEmail } from '../lib/links'
import { Botao, SetaWhatsapp } from '../componentes/Botao'
import { Revelar } from '../componentes/Revelar'
import { TextoRevelado } from '../componentes/TextoRevelado'
import { OndaPontosLazy } from '../componentes/OndaPontosLazy'

type Erros = { nome?: string; projeto?: string }

export function Contato() {
  const idNome = useId()
  const idProjeto = useId()
  const refNome = useRef<HTMLInputElement>(null)
  const refProjeto = useRef<HTMLTextAreaElement>(null)
  const [nome, setNome] = useState('')
  const [projeto, setProjeto] = useState('')
  const [erros, setErros] = useState<Erros>({})

  const zap = linkWhatsapp()
  const temEmail = Boolean(contato.email)
  const temCanal = temEmail || Boolean(contato.whatsapp)
  const destino = temEmail ? 'e-mail' : 'WhatsApp'

  function enviar(ev: FormEvent) {
    ev.preventDefault()

    /* Erro por campo, e não uma frase solta no fim do formulário:
       quem usa leitor de tela precisa saber QUAL campo faltou. O foco
       vai para o primeiro problema, que é o que a pessoa vai corrigir. */
    const novos: Erros = {}
    if (!nome.trim()) novos.nome = 'Escreve seu nome, para eu saber com quem falo.'
    if (!projeto.trim()) novos.projeto = 'Duas linhas sobre o que você vende já bastam.'
    setErros(novos)

    if (novos.nome) {
      refNome.current?.focus()
      return
    }
    if (novos.projeto) {
      refProjeto.current?.focus()
      return
    }

    const corpo = `Nome: ${nome.trim()}

Projeto:
${projeto.trim()}`
    const alvo = temEmail
      ? linkEmail(`Orçamento de site — ${nome.trim()}`, corpo)
      : linkWhatsapp(corpo)
    if (alvo) window.location.href = alvo
  }

  const campoBase =
    'mt-2.5 w-full rounded-[2px] border bg-transparent px-3.5 py-2.5 text-base text-texto transition-colors placeholder:text-texto-fraco/70 focus:outline-none'

  return (
    <section id="orcamento" className="relative isolate scroll-mt-24 overflow-hidden border-b border-linha">
      <div className="absolute inset-0 -z-10">
        <OndaPontosLazy cor="#5cfd86" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-fundo from-20% via-fundo/80 to-fundo" />
      </div>

      <div className="relative mx-auto max-w-[86rem] respiro-lateral py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-14">
          <Revelar className="lg:col-span-6">
            <p className="rotulo text-texto-fraco">
              04 <span aria-hidden="true" className="mx-2 text-texto-fraco">/</span> Orçamento
            </p>
            <TextoRevelado
              as="h2"
              texto="Conta o que você vende. Eu respondo com prazo e preço."
              className="display mt-6 block max-w-[13ch] text-[clamp(2rem,5.5vw,4.25rem)]"
            />
            <p className="medida-texto mt-6 text-texto-medio">
              Não precisa chegar com o projeto pronto na cabeça. Duas linhas sobre o negócio já
              bastam para eu dizer se faz sentido e quanto custa.
            </p>

            {zap ? (
              <div className="mt-9">
                <Botao href={zap} target="_blank" rel="noopener noreferrer" tamanho="grande">
                  <SetaWhatsapp />
                  Falar no WhatsApp
                </Botao>
                <p className="rotulo mt-4 text-texto-fraco">Resposta no horário comercial</p>
              </div>
            ) : null}
          </Revelar>

          {/* Alternativa para quem não quer entregar o número */}
          <Revelar className="lg:col-span-5 lg:col-start-8">
            <form onSubmit={enviar} noValidate className="border-t border-linha pt-8">
              <p className="rotulo text-texto-fraco">Ou escreva por aqui</p>

              <div className="mt-7">
                <label htmlFor={idNome} className="rotulo block text-texto-medio">
                  Seu nome
                </label>
                <input
                  ref={refNome}
                  id={idNome}
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  aria-invalid={erros.nome ? true : undefined}
                  aria-describedby={erros.nome ? `${idNome}-erro` : undefined}
                  className={
                    campoBase +
                    ' min-h-11 ' +
                    (erros.nome ? 'border-neon' : 'border-campo-borda focus:border-neon')
                  }
                  placeholder="Como te chamo…"
                />
                {erros.nome ? (
                  <p
                    id={`${idNome}-erro`}
                    role="alert"
                    className="mt-2 flex gap-2 text-[0.9375rem] text-neon"
                  >
                    <span aria-hidden="true">↳</span>
                    {erros.nome}
                  </p>
                ) : null}
              </div>

              <div className="mt-6">
                <label htmlFor={idProjeto} className="rotulo block text-texto-medio">
                  O que você precisa
                </label>
                <textarea
                  ref={refProjeto}
                  id={idProjeto}
                  name="projeto"
                  rows={5}
                  autoComplete="off"
                  value={projeto}
                  onChange={(e) => setProjeto(e.target.value)}
                  aria-invalid={erros.projeto ? true : undefined}
                  aria-describedby={erros.projeto ? `${idProjeto}-erro` : undefined}
                  className={
                    campoBase +
                    ' resize-y leading-relaxed ' +
                    (erros.projeto ? 'border-neon' : 'border-campo-borda focus:border-neon')
                  }
                  placeholder="Ex.: tenho uma loja de piso e quero um catálogo que eu mesmo atualize…"
                />
                {erros.projeto ? (
                  <p
                    id={`${idProjeto}-erro`}
                    role="alert"
                    className="mt-2 flex gap-2 text-[0.9375rem] text-neon"
                  >
                    <span aria-hidden="true">↳</span>
                    {erros.projeto}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={!temCanal}
                className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-[2px] border border-campo-borda px-6 py-3.5 text-[0.9375rem] font-medium text-texto transition-[color,background-color,border-color,box-shadow] duration-300 hover:border-neon hover:text-neon hover:shadow-[0_0_28px_-12px_var(--color-neon)] disabled:cursor-not-allowed disabled:border-linha disabled:text-texto-fraco disabled:hover:shadow-none sm:w-auto"
              >
                Enviar por {destino}
              </button>
              <p className="rotulo mt-4 text-texto-fraco">
                {temCanal
                  ? `Abre o seu ${destino} com a mensagem já escrita`
                  : 'Canal de contato ainda não configurado em src/dados.ts'}
              </p>
            </form>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
