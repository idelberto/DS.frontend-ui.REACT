import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function HelloWorld({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cn('rounded-lg bg-card p-4 text-card-foreground', className)} {...props}>
      Instalado pelo registry @frontend-ui.
    </p>
  );
}
