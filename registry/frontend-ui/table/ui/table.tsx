import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

// As mesmas peças do table do shadcn, com o visual do Admin One: linhas listradas e bordas entre as
// colunas no desktop, e cada linha vira um cartão no celular, com o rótulo da coluna antes do valor.

function Table({ className, ...props }: ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-slot="table" className={cn('w-full caption-bottom', className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('hidden lg:table-header-group', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      // O hover precisa vencer o fundo das listradas: o :nth-child(n) soma a especificidade, como o
      // "tbody tr, tbody tr:nth-child(odd)" do Admin One. Sem ele, as ímpares não mudavam.
      className={cn(
        'lg:[&>tr:nth-child(odd)]:bg-muted/50 lg:[&>tr:nth-child(n):hover]:bg-muted dark:lg:[&>tr:nth-child(odd)]:bg-background/50 dark:lg:[&>tr:nth-child(n):hover]:bg-muted',
        className,
      )}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
  return (
    <tfoot data-slot="table-footer" className={cn('border-t font-medium', className)} {...props} />
  );
}

function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'relative block max-w-full border-b-4 border-border transition-colors last:border-b-0 has-[[data-slot=checkbox][data-checked]]:bg-brand-muted! lg:table-row lg:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn('p-3 text-left align-middle font-semibold whitespace-nowrap', className)}
      {...props}
    />
  );
}

interface TableCellProps extends ComponentProps<'td'> {
  // O nome da coluna, que aparece antes do valor no celular, onde o cabeçalho some.
  label?: string;
}

function TableCell({ className, label, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-label={label}
      className={cn(
        'flex items-center justify-between gap-4 border-b border-border px-4 py-3 text-right align-top last:border-b-0 lg:table-cell lg:border-b-0 lg:p-3 lg:text-left lg:align-middle lg:not-first:border-l',
        'before:pr-3 before:text-left before:font-semibold before:content-[attr(data-label)] lg:before:hidden',
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
