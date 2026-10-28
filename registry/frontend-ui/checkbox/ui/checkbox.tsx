'use client';

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer group/checkbox flex size-5 shrink-0 items-center justify-center rounded-sm border border-input bg-card text-primary-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive data-checked:border-primary data-checked:bg-primary data-indeterminate:border-primary data-indeterminate:bg-primary dark:bg-background',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator">
        <CheckIcon className="size-3.5 group-data-indeterminate/checkbox:hidden" strokeWidth={3} />
        <MinusIcon
          className="hidden size-3.5 group-data-indeterminate/checkbox:block"
          strokeWidth={3}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
