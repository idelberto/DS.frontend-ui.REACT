import type { ComponentProps, ComponentType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function CardBox({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-box"
      className={cn('flex flex-col rounded-2xl bg-card text-card-foreground', className)}
      {...props}
    />
  );
}

interface CardBoxHeaderProps {
  title: string;
  icon?: ComponentType<{ className?: string }>;
  // A ação à direita do título, em geral um botão de ícone.
  action?: ReactNode;
}

export function CardBoxHeader({ title, icon: Icon, action }: CardBoxHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b px-6 py-3">
      <h2 className="flex items-center gap-3 font-bold">
        {Icon !== undefined && <Icon className="size-5" />}
        {title}
      </h2>
      {action}
    </header>
  );
}

export function CardBoxBody({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-box-body" className={cn('flex-1 p-6', className)} {...props} />;
}

export function CardBoxFooter({ className, ...props }: ComponentProps<'footer'>) {
  return (
    <footer
      data-slot="card-box-footer"
      className={cn('flex flex-wrap gap-3 p-6 pt-0', className)}
      {...props}
    />
  );
}
