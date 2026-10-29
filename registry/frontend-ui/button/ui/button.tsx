import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// O hover escurece a cor, como os -700 do Admin One.
const DARKER_ON_HOVER = 'hover:brightness-90';

// Mantém as variantes e os tamanhos do button do shadcn: o sidebar, o sheet e os outros componentes
// do shadcn usam esses nomes.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 border font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-70 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: `border-primary bg-primary text-primary-foreground ${DARKER_ON_HOVER}`,
        secondary: 'border-secondary bg-secondary text-secondary-foreground hover:bg-accent',
        contrast: `border-foreground bg-foreground text-background ${DARKER_ON_HOVER}`,
        destructive: `border-destructive bg-destructive text-destructive-foreground ${DARKER_ON_HOVER}`,
        success: `border-success bg-success text-success-foreground ${DARKER_ON_HOVER}`,
        warning: `border-warning bg-warning text-warning-foreground ${DARKER_ON_HOVER}`,
        info: `border-info bg-info text-info-foreground ${DARKER_ON_HOVER}`,
        outline:
          'border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
        ghost: 'border-transparent hover:bg-muted hover:text-foreground',
        link: 'border-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-3',
        xs: 'h-6 gap-1 px-2 text-xs',
        sm: 'h-8 gap-1.5 px-2.5 text-sm',
        lg: 'h-12 px-5',
        icon: 'size-10',
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
      shape: {
        default: 'rounded-sm',
        pill: 'rounded-full',
      },
    },
    compoundVariants: [
      { shape: 'pill', size: 'default', className: 'px-6' },
      { shape: 'pill', size: 'sm', className: 'px-3' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  shape = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, shape, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
