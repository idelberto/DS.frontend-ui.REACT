import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ComponentType } from 'react';

import { cn } from '@/lib/utils';

const pillTagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border leading-none font-semibold whitespace-nowrap [&_svg]:shrink-0',
  {
    variants: {
      tone: {
        brand: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
        neutral: '',
      },
      variant: {
        solid: '',
        // Fundo claro e texto na cor: o status dentro de uma tabela.
        soft: 'border-transparent',
      },
      size: {
        default: 'px-4 py-1.5 text-sm [&_svg]:size-4',
        sm: 'px-3 py-1 text-xs [&_svg]:size-3.5',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        tone: 'brand',
        className: 'border-primary bg-primary text-primary-foreground',
      },
      {
        variant: 'solid',
        tone: 'success',
        className: 'border-success bg-success text-success-foreground',
      },
      {
        variant: 'solid',
        tone: 'warning',
        className: 'border-warning bg-warning text-warning-foreground',
      },
      {
        variant: 'solid',
        tone: 'danger',
        className: 'border-destructive bg-destructive text-destructive-foreground',
      },
      { variant: 'solid', tone: 'info', className: 'border-info bg-info text-info-foreground' },
      {
        variant: 'solid',
        tone: 'neutral',
        className: 'border-foreground bg-foreground text-background',
      },
      { variant: 'soft', tone: 'brand', className: 'bg-brand-muted text-brand-muted-foreground' },
      { variant: 'soft', tone: 'success', className: 'bg-success/15 text-success' },
      { variant: 'soft', tone: 'warning', className: 'bg-warning/15 text-warning' },
      { variant: 'soft', tone: 'danger', className: 'bg-destructive/15 text-destructive' },
      { variant: 'soft', tone: 'info', className: 'bg-info/15 text-info' },
      { variant: 'soft', tone: 'neutral', className: 'bg-muted text-muted-foreground' },
    ],
    defaultVariants: {
      tone: 'brand',
      variant: 'solid',
      size: 'default',
    },
  },
);

interface PillTagProps extends ComponentProps<'span'>, VariantProps<typeof pillTagVariants> {
  icon?: ComponentType<{ className?: string }>;
}

export function PillTag({
  tone,
  variant,
  size,
  icon: Icon,
  className,
  children,
  ...props
}: PillTagProps) {
  return (
    <span className={cn(pillTagVariants({ tone, variant, size }), className)} {...props}>
      {Icon !== undefined && <Icon />}
      {children}
    </span>
  );
}
