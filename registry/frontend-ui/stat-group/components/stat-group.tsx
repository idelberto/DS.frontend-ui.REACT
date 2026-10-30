import { Meter } from '@base-ui/react/meter';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ComponentType, ReactNode } from 'react';

import { cn } from '@/lib/utils';
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

interface StatGoal {
  // O valor de agora e a meta, em número: a barra mostra a fração.
  current: number;
  target: number;
  // A meta já formatada, como "R$ 60.000".
  label: string;
}

interface StatProps extends VariantProps<typeof statIconVariants> {
  label: string;
  // O valor já formatado, como "R$ 7.770". Sem dado no período, null: o indicador mostra um traço.
  value: string | null;
  icon: ComponentType<{ className?: string }>;
  // O selo acima do nome, em geral um PillTag com a tendência.
  trend?: ReactNode;
  // A meta, numa barra abaixo do valor.
  goal?: StatGoal;
  // Enquanto o dado chega: o esqueleto no lugar do nome, do valor, do selo e do ícone.
  loading?: boolean;
}

const STAT_GRID = 'grid grid-cols-[1fr_auto] content-start items-center gap-x-4 p-6';

// A linha do selo tem a altura do botão de ícone da ação (2rem), que fica ao lado dela no StatCard.
const TREND_ROW = 'col-span-2 row-start-1 mb-3 flex h-8 items-center';

// O bg-muted do Skeleton some sobre o card: o esqueleto usa o cinza de apoio a 15%, como o
// loading-state, e o pulso para quando o sistema pede menos movimento.
const SKELETON = 'block animate-pulse rounded-md bg-muted-foreground/15 motion-reduce:animate-none';

// O nome e o valor são o dt e o dd; o selo e o ícone vão em dd próprios, e o do ícone sai da árvore
// de acessibilidade. A grade põe o selo em cima e o ícone à direita, como no card do Admin One.
// Entre 1024 e 1279px as três colunas ficam estreitas, e o valor desce a 1.5rem para não quebrar.
export function Stat(props: StatProps) {
  return <StatItem {...props} hasAction={false} />;
}

interface StatCardProps extends StatProps {
  // A ação do indicador, no canto de cima, em geral um botão de ícone.
  action?: ReactNode;
}

// O indicador num card só dele, o CardBoxWidget do Admin One. A ação fica fora da lista <dl>, que só
// aceita nome e valor, e vai por cima, no canto, na altura do selo.
export function StatCard({ action, ...stat }: StatCardProps) {
  return (
    <CardBox className="relative">
      <dl className="grid">
        <StatItem {...stat} hasAction={action !== undefined} />
      </dl>
      {action !== undefined && <div className="absolute top-6 right-6">{action}</div>}
    </CardBox>
  );
}

interface StatItemProps extends StatProps {
  // Sem selo, o card com ação reserva a linha dele (o p-6, os 2rem do botão e o mb-3): o nome fica na
  // mesma altura do card vizinho com selo, e o ícone não vai para baixo do botão.
  hasAction: boolean;
}

function StatItem({
  label,
  value,
  icon: Icon,
  tone,
  trend,
  goal,
  loading,
  hasAction,
}: StatItemProps) {
  const hasTopRow = trend !== undefined || loading === true;

  if (loading === true) {
    return (
      <div className={STAT_GRID}>
        <dt className="col-start-1 row-start-2">
          <span className="sr-only">{label}</span>
          <span aria-hidden="true" className={cn(SKELETON, 'h-5 w-24')} />
        </dt>
        <dd className="col-start-1 row-start-3 mt-2">
          <span className="sr-only">Carregando…</span>
          <span aria-hidden="true" className={cn(SKELETON, 'h-8 w-36 max-w-full')} />
        </dd>
        <dd aria-hidden="true" className={TREND_ROW}>
          <span className={cn(SKELETON, 'h-6 w-14 rounded-full')} />
        </dd>
        <dd aria-hidden="true" className="col-start-2 row-span-2 row-start-2">
          <span className={cn(SKELETON, 'size-12')} />
        </dd>
      </div>
    );
  }

  return (
    <div className={cn(STAT_GRID, hasAction && !hasTopRow && 'pt-17')}>
      <dt className="col-start-1 row-start-2 text-lg leading-tight text-muted-foreground">
        {label}
      </dt>
      {value === null ? (
        <>
          {/* O traço é só visual: o leitor de tela ouve "Sem dados no período". */}
          <dd
            aria-hidden="true"
            className="col-start-1 row-start-3 text-3xl leading-tight font-semibold text-muted-foreground"
          >
            —
          </dd>
          <dd className="col-span-2 row-start-4 mt-2 text-sm text-muted-foreground">
            Sem dados no período
          </dd>
        </>
      ) : (
        <dd className="col-start-1 row-start-3 text-3xl leading-tight font-semibold lg:text-2xl xl:text-3xl">
          {value}
        </dd>
      )}
      {value !== null && trend !== undefined && <dd className={TREND_ROW}>{trend}</dd>}
      <dd aria-hidden="true" className="col-start-2 row-span-2 row-start-2">
        <Icon
          className={
            value === null ? 'size-12 text-muted-foreground/40' : statIconVariants({ tone })
          }
        />
      </dd>
      {value !== null && goal !== undefined && <StatGoalBar goal={goal} />}
    </div>
  );
}

// No escuro, a barra vai na marca clara, como o botão de contorno: a marca cheia ficava em 2:1 sobre o
// trilho, abaixo dos 3:1 do AA para gráfico.
// O Meter do Base UI dá ao leitor de tela "Meta R$ 60.000, 81% da meta". Os textos visíveis saem da
// árvore para não serem lidos duas vezes. Acima da meta, a barra fica cheia e o texto mostra o valor
// real, como "110% da meta".
function StatGoalBar({ goal }: { goal: StatGoal }) {
  const percent = Math.round((goal.current / goal.target) * 100);
  const progress = `${String(percent)}% da meta`;
  return (
    <dd className="col-span-2 row-start-4 mt-4">
      <Meter.Root
        value={Math.min(goal.current, goal.target)}
        max={goal.target}
        aria-valuetext={progress}
        className="flex flex-col gap-2"
      >
        <Meter.Track className="h-2 overflow-hidden rounded-full bg-muted">
          <Meter.Indicator className="h-full rounded-full bg-primary dark:bg-brand-muted-foreground" />
        </Meter.Track>
        <div className="flex flex-wrap justify-between gap-x-3 text-sm text-muted-foreground">
          <span aria-hidden="true" className="font-semibold text-foreground">
            {progress}
          </span>
          <Meter.Label aria-hidden="true">Meta {goal.label}</Meter.Label>
        </div>
      </Meter.Root>
    </dd>
  );
}
