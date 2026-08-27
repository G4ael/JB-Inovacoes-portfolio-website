import { Suspense, lazy } from 'react'

/* A onda é decoração: nada na página depende dela para ser lida.
   Por isso o WebGL sai do pedaço inicial do bundle e chega depois,
   sem segurar o primeiro desenho nem o tempo até interativo. */
const Onda = lazy(() =>
  import('./OndaPontos').then((m) => ({ default: m.OndaPontos })),
)

type Props = {
  cor?: string
  className?: string
}

export function OndaPontosLazy(props: Props) {
  return (
    <Suspense fallback={null}>
      <Onda {...props} />
    </Suspense>
  )
}
