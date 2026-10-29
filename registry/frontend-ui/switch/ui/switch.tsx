'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

import { cn } from '@/lib/utils';

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-6 w-12 shrink-0 items-center rounded-full border border-input bg-muted p-0.5 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-primary data-checked:bg-primary',
        className,
      )}
      {...props}
    >
      {/* O polegar é claro nos dois modos, como no Admin One: no escuro, o do card sumia no trilho. */}
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block size-[1.125rem] rounded-full border border-input bg-card transition-transform data-checked:translate-x-6 data-checked:border-primary dark:bg-foreground"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
