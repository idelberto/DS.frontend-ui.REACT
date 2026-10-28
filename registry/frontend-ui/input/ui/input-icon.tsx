import type { ComponentProps, ComponentType } from 'react';

import { Input } from '@/registry/frontend-ui/input/ui/input';
import { cn } from '@/lib/utils';

interface InputIconProps extends ComponentProps<typeof Input> {
  icon: ComponentType<{ className?: string }>;
}

function InputIcon({ icon: Icon, className, ...props }: InputIconProps) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input className={cn('pl-10', className)} {...props} />
    </div>
  );
}

export { InputIcon };
