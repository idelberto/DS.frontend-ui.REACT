import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

// O espaço entre os blocos da página (título, cards) é o gap daqui, e não a margem de cada um: um
// filho com margem somaria com o gap.
export function SectionMain({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      className={cn('flex flex-col gap-6 p-6 xl:mx-auto xl:w-full xl:max-w-6xl', className)}
      {...props}
    />
  );
}
