/* Interruptor global de movimento.

   A WCAG 2.2.2 pede um controle para qualquer movimento automático que
   passe de 5 segundos — e aqui há dois: a faixa rolante e a onda em
   WebGL. Pausar no hover não resolve, porque no toque e no teclado o
   hover não existe.

   A escolha fica no localStorage e é reaplicada na carga seguinte.
   Quem já pediu menos movimento no sistema entra pausado por padrão. */

const CHAVE = 'jb:movimento'

type Ouvinte = (pausado: boolean) => void

const ouvintes = new Set<Ouvinte>()
let pausado = false

function ler(): boolean {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (salvo === 'pausado') return true
    if (salvo === 'ativo') return false
  } catch {
    /* modo privado ou storage bloqueado: segue o sistema */
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function aplicar() {
  document.documentElement.dataset.movimento = pausado ? 'pausado' : 'ativo'
  ouvintes.forEach((f) => f(pausado))
}

export function iniciarMovimento() {
  pausado = ler()
  aplicar()
}

export function movimentoPausado() {
  return pausado
}

export function alternarMovimento() {
  pausado = !pausado
  try {
    localStorage.setItem(CHAVE, pausado ? 'pausado' : 'ativo')
  } catch {
    /* sem storage, a escolha vale só nesta visita */
  }
  aplicar()
}

export function ouvirMovimento(f: Ouvinte): () => void {
  ouvintes.add(f)
  return () => {
    ouvintes.delete(f)
  }
}
