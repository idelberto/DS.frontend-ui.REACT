import { Skeleton } from '@/components/ui/skeleton';

const PLACEHOLDER_ROWS = ['first', 'second', 'third'];

// O esqueleto ocupa só o conteúdo: o menu e o cabeçalho da área continuam na tela enquanto a página carrega.
export function LoadingState() {
  return (
    <div role="status" className="flex flex-col gap-6">
      <span className="sr-only">Carregando…</span>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div className="flex flex-col gap-3">
        {PLACEHOLDER_ROWS.map((row) => (
          <Skeleton key={row} className="h-12 w-full rounded-2xl bg-card" />
        ))}
      </div>
    </div>
  );
}
