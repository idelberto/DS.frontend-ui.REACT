import {
  CalendarClock,
  ChartLine,
  FileText,
  HandCoins,
  Settings,
  Stethoscope,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { ShowcaseShell } from '@/components/showcase-shell';
import { SectionMain } from '@/registry/frontend-ui/section-main/components/section-main';
import { SectionTitle } from '@/registry/frontend-ui/section-title/components/section-title';

export const metadata: Metadata = { title: 'Painel' };

interface Stat {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
}

const STATS: Stat[] = [
  { label: 'Pacientes', value: '512', trend: '12%', icon: Users },
  { label: 'Atendimentos', value: '38', trend: '8%', icon: Stethoscope },
  { label: 'Faturamento', value: 'R$ 7.770', trend: '3%', icon: HandCoins },
];

function SettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-7 items-center justify-center rounded-sm bg-secondary text-secondary-foreground"
    >
      <Settings className="size-4" />
    </button>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-2xl bg-card p-6 text-card-foreground">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-brand-muted px-3 py-1 text-xs font-semibold text-brand-muted-foreground">
          {stat.trend}
        </span>
        <SettingsButton label={`Configurar ${stat.label}`} />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg leading-tight text-muted-foreground">{stat.label}</h2>
          <p className="text-3xl leading-tight font-semibold">{stat.value}</p>
        </div>
        <Icon className="size-12 text-primary" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ShowcaseShell>
      <SectionMain>
        <SectionTitle icon={ChartLine} title="Resumo Geral">
          <Button className="h-9 rounded-full px-5">
            <FileText />
            Aprenda mais sobre a vitrine
          </Button>
        </SectionTitle>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <section className="rounded-2xl bg-card text-card-foreground">
          <header className="flex items-center justify-between border-b px-6 py-3">
            <h2 className="flex items-center gap-3 font-bold">
              <CalendarClock className="size-5" />
              Compromissos de Hoje
            </h2>
            <SettingsButton label="Configurar compromissos" />
          </header>
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-muted-foreground">
            <CalendarClock className="size-8" />
            <p>Nenhum compromisso agendado para hoje</p>
          </div>
        </section>
      </SectionMain>
    </ShowcaseShell>
  );
}
