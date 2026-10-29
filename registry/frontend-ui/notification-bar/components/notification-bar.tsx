'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';

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

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Ao fechar, a barra some com o botão focado, e o foco cairia no <body>, mandando o próximo Tab de
// volta ao topo. Ele passa ao próximo elemento focável da página, ou ao anterior se a barra for o
// último.
function moveFocusAway(bar: HTMLElement) {
  if (!bar.contains(document.activeElement)) {
    return;
  }
  const focusables = [...document.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (element) => !bar.contains(element),
  );
  const after = focusables.filter(
    (element) => (bar.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0,
  );
  const before = focusables.filter(
    (element) => (bar.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING) !== 0,
  );
  // Um elemento escondido não recebe o foco: aí tenta o seguinte.
  for (const candidate of [...after, ...before.reverse()]) {
    candidate.focus();
    if (document.activeElement === candidate) {
      return;
    }
  }
}

export function NotificationBar({ tone, icon, action, className, children }: NotificationBarProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  if (isDismissed) {
    return null;
  }

  return (
    <div ref={barRef} role="status" className={cn(notificationBarVariants({ tone }), className)}>
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
          // Sobre a cor cheia do aviso, o anel de foco vai na cor do texto: o da marca sumiria.
          className="text-current hover:bg-current/20 hover:text-current focus-visible:ring-current"
          onClick={() => {
            if (barRef.current !== null) {
              moveFocusAway(barRef.current);
            }
            setIsDismissed(true);
          }}
        >
          <X />
        </Button>
      )}
    </div>
  );
}
