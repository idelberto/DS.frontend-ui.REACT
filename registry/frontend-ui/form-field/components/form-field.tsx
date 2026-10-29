import { Field } from '@base-ui/react/field';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  // O campo: o Input, o InputIcon ou outro controle do Base UI, que o Field liga ao rótulo, à ajuda e
  // ao erro sozinho.
  children: ReactNode;
  description?: string;
  error?: string;
  className?: string;
}

export function FormField({ label, children, description, error, className }: FormFieldProps) {
  return (
    <Field.Root invalid={error !== undefined} className={cn('flex flex-col gap-2', className)}>
      <Field.Label className="font-bold">{label}</Field.Label>
      {children}
      {description !== undefined && (
        <Field.Description className="text-xs text-muted-foreground">
          {description}
        </Field.Description>
      )}
      <Field.Error
        match={error !== undefined}
        className="text-xs font-medium text-destructive-muted-foreground"
      >
        {error}
      </Field.Error>
    </Field.Root>
  );
}
