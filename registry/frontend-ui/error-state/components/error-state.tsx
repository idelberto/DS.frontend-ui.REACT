'use client';

import { TriangleAlert } from 'lucide-react';

import { Button, buttonVariants } from '@/registry/frontend-ui/button/ui/button';

interface ErrorStateProps {
  digest: string | null;
  homeHref: string;
  onRetry: () => void;
}

// A tela de erro dos error.tsx e do global-error. O "Voltar ao início" é um link comum, e não o Link do Next:
// recarrega a página inteira, o que também limpa o estado que quebrou.
export function ErrorState({ digest, homeHref, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 rounded-2xl bg-card p-6 text-center text-card-foreground"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive-muted-foreground">
        <TriangleAlert className="size-5" />
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Não foi possível carregar esta tela</h1>
        <p className="text-sm text-pretty text-muted-foreground">
          Pode ter sido uma falha passageira. Tente de novo.
        </p>
        <SupportHint digest={digest} />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={onRetry}>Tentar de novo</Button>
        <a href={homeHref} className={buttonVariants({ variant: 'outline' })}>
          Voltar ao início
        </a>
      </div>
    </div>
  );
}

// Erro que nasce no navegador não tem digest nem linha no log: aí não há código para mostrar.
function SupportHint({ digest }: { digest: string | null }) {
  if (digest === null) {
    return <p className="text-sm text-muted-foreground">Se o erro continuar, avise o suporte.</p>;
  }
  return (
    <p className="text-sm text-muted-foreground">
      Se o erro continuar, avise o suporte com o código{' '}
      <code className="font-mono text-foreground">{digest}</code>.
    </p>
  );
}
