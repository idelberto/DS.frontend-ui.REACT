import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ComponentType, ReactNode } from 'react';

import { CardBox, CardBoxHeader } from '@/registry/frontend-ui/card-box/components/card-box';

type StatGroupProps = ComponentProps<typeof CardBoxHeader> & {
  // Os Stat.
  children: ReactNode;
};

// Os indicadores do painel num card só, com o cabeçalho do card-box e uma ação para o grupo (no
// Admin One são três cards). Lado a lado com divisória a partir de 1024px, um embaixo do outro no
// celular. A lista <dl> dá ao leitor de tela cada par nome e valor.
export function StatGroup({ children, ...header }: StatGroupProps) {
  return (
    <CardBox>
      <CardBoxHeader {...header} />
      <dl className="grid divide-y divide-border lg:auto-cols-fr lg:grid-flow-col lg:divide-x lg:divide-y-0">
        {children}
      </dl>
    </CardBox>
  );
}

// O ícone é status sobre o card: no escuro, o -muted-foreground do tema (a regra do CLAUDE.md).
const statIconVariants = cva('size-12', {
  variants: {
    tone: {
      brand: 'text-primary dark:text-brand-muted-foreground',
      success: 'text-success dark:text-success-muted-foreground',
      warning: 'text-warning dark:text-warning-muted-foreground',
      danger: 'text-destructive dark:text-destructive-muted-foreground',
      info: 'text-info dark:text-info-muted-foreground',
      neutral: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
});

interface StatProps extends VariantProps<typeof statIconVariants> {
  label: string;
  // O valor já formatado, como "R$ 7.770".
  value: string;
  icon: ComponentType<{ className?: string }>;
  // O selo acima do nome, em geral um PillTag com a tendência.
  trend?: ReactNode;
}

// O nome e o valor são o dt e o dd; o selo e o ícone vão em dd próprios, e o do ícone sai da árvore
// de acessibilidade. A grade põe o selo em cima e o ícone à direita, como no card do Admin One.
// Entre 1024 e 1279px as três colunas ficam estreitas, e o valor desce a 1.5rem para não quebrar.
export function Stat({ label, value, icon: Icon, tone, trend }: StatProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] content-start items-center gap-x-4 p-6">
      <dt className="col-start-1 row-start-2 text-lg leading-tight text-muted-foreground">
        {label}
      </dt>
      <dd className="col-start-1 row-start-3 text-3xl leading-tight font-semibold lg:text-2xl xl:text-3xl">
        {value}
      </dd>
      {trend !== undefined && <dd className="col-span-2 row-start-1 mb-3">{trend}</dd>}
      <dd aria-hidden="true" className="col-start-2 row-span-2 row-start-2">
        <Icon className={statIconVariants({ tone })} />
      </dd>
    </div>
  );
}
