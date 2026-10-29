'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import { Button } from '@/registry/frontend-ui/button/ui/button';
import { cn } from '@/lib/utils';

const notificationBarVariants = cva(
  'flex flex-col items-center gap-3 rounded-lg border px-3 py-6 md:flex-row md:py-3',
  {
    variants: {
      tone: {
        brand: 'border-primary bg-primary text-primary-foreground',
        success: 'border-success bg-success text-success-foreground',
        warning: 'border-warning bg-warning text-warning-foreground',
        danger: 'border-destructive bg-destructive text-destructive-foreground',
        info: 'border-info bg-info text-info-foreground',
        neutral: 'border-border bg-card text-card-foreground',
      },
    },
    defaultVariants: {
      tone: 'info',
    },
  },
);

interface NotificationBarProps extends VariantProps<typeof notificationBarVariants> {
  children: ReactNode;
  // Elemento, e não componente (icon={<Info />}): função não passa do servidor para o cliente.
  icon?: ReactNode;
  // A ação à direita. Sem ela, a barra mostra o botão de fechar.
  action?: ReactNode;
  className?: string;
}

export function NotificationBar({ tone, icon, action, className, children }: NotificationBarProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <div role="status" className={cn(notificationBarVariants({ tone }), className)}>
      <div className="flex flex-1 flex-col items-center gap-2 text-center md:flex-row md:text-left [&>svg]:size-10 [&>svg]:shrink-0 md:[&>svg]:size-5">
        {icon}
        <span>{children}</span>
      </div>
      {action}
      {action === undefined && (
        <Button
          variant="ghost"
          size="icon-sm"
          shape="pill"
          aria-label="Fechar aviso"
          className="text-current hover:bg-current/20 hover:text-current"
          onClick={() => {
            setIsDismissed(true);
          }}
        >
          <X />
        </Button>
      )}
    </div>
  );
}
