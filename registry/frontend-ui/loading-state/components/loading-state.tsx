import { Skeleton } from '@/components/ui/skeleton';

const PLACEHOLDER_ROWS = ['first', 'second', 'third'];

// O bg-muted do Skeleton some sobre o cinza da página (1,03:1): as barras usam o cinza de apoio a
// 15%. O pulso para quando o sistema pede menos movimento.
const BAR_CLASS = 'bg-muted-foreground/15 motion-reduce:animate-none';

// O esqueleto ocupa só o conteúdo: o menu e o cabeçalho da área continuam na tela enquanto a página carrega.
export function LoadingState() {
  return (
    <div role="status" className="flex flex-col gap-6">
      <span className="sr-only">Carregando…</span>
      <div className="flex flex-col gap-2">
        <Skeleton className={`h-8 w-48 ${BAR_CLASS}`} />
        <Skeleton className={`h-4 w-80 max-w-full ${BAR_CLASS}`} />
      </div>
      <div className="flex flex-col gap-3">
        {PLACEHOLDER_ROWS.map((row) => (
          <div key={row} className="flex h-12 items-center rounded-2xl bg-card px-4">
            <Skeleton className={`h-3 w-2/3 ${BAR_CLASS}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
