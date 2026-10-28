import type { ComponentType, ReactNode } from 'react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

interface EmptyStateProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children?: ReactNode;
}

// Vazio é a consulta que deu certo e voltou sem linhas. Falha de leitura nunca chega aqui: o repositório não
// devolve lista vazia no erro, e o erro sobe até o error.tsx.
export function EmptyState({ icon: Icon, title, description, children }: EmptyStateProps) {
  return (
    <Empty className="rounded-2xl bg-card text-card-foreground">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children !== undefined && <EmptyContent>{children}</EmptyContent>}
    </Empty>
  );
}
