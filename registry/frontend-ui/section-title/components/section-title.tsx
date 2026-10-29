import type { ComponentType, ReactNode } from 'react';

interface SectionTitleProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  // A ação à direita do título, em geral um botão.
  children?: ReactNode;
}

export function SectionTitle({ icon: Icon, title, children }: SectionTitleProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-card text-card-foreground">
          <Icon className="size-6" />
        </span>
        <h1 className="text-3xl leading-tight">{title}</h1>
      </div>
      {children}
    </div>
  );
}
