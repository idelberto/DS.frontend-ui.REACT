import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function SectionMain({ className, ...props }: ComponentProps<'section'>) {
  return <section className={cn('p-6 xl:mx-auto xl:w-full xl:max-w-6xl', className)} {...props} />;
}
