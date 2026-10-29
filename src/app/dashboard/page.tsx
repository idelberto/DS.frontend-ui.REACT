import {
  CalendarClock,
  ChartLine,
  CircleAlert,
  FileText,
  HandCoins,
  Settings,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { Metadata } from 'next';

import { ShowcaseShell } from '@/components/showcase-shell';
import { Button } from '@/registry/frontend-ui/button/ui/button';
import {
  CardBox,
  CardBoxBody,
  CardBoxHeader,
} from '@/registry/frontend-ui/card-box/components/card-box';
import { PillTag } from '@/registry/frontend-ui/pill-tag/components/pill-tag';
import { SectionMain } from '@/registry/frontend-ui/section-main/components/section-main';
import { SectionTitle } from '@/registry/frontend-ui/section-title/components/section-title';

export const metadata: Metadata = { title: 'Painel' };

interface Stat {
  label: string;
  value: string;
  trend: { label: string; tone: 'success' | 'danger' | 'warning'; icon: LucideIcon };
  icon: LucideIcon;
  iconClassName: string;
}

const STATS: Stat[] = [
  {
    label: 'Pacientes',
    value: '512',
    trend: { label: '12%', tone: 'success', icon: TrendingUp },
    icon: Users,
    iconClassName: 'text-success',
  },
  {
    label: 'Atendimentos',
    value: '38',
    trend: { label: '8%', tone: 'danger', icon: TrendingDown },
    icon: Stethoscope,
    iconClassName: 'text-info',
  },
  {
    label: 'Faturamento',
    value: 'R$ 7.770',
    trend: { label: 'Meta', tone: 'warning', icon: CircleAlert },
    icon: HandCoins,
    iconClassName: 'text-destructive',
  },
];

function SettingsButton({ label }: { label: string }) {
  return (
    <Button variant="secondary" size="icon-sm" aria-label={label}>
      <Settings />
    </Button>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;

  return (
    <CardBox>
      <CardBoxBody>
        <div className="mb-3 flex items-center justify-between">
          <PillTag tone={stat.trend.tone} size="sm" icon={stat.trend.icon}>
            {stat.trend.label}
          </PillTag>
          <SettingsButton label={`Configurar ${stat.label}`} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg leading-tight text-muted-foreground">{stat.label}</h2>
            <p className="text-3xl leading-tight font-semibold">{stat.value}</p>
          </div>
          <Icon className={`size-12 ${stat.iconClassName}`} />
        </div>
      </CardBoxBody>
    </CardBox>
  );
}

export default function DashboardPage() {
  return (
    <ShowcaseShell>
      <SectionMain>
        <SectionTitle icon={ChartLine} title="Resumo Geral">
          <Button variant="contrast" size="sm" shape="pill">
            <FileText />
            Aprenda mais sobre a vitrine
          </Button>
        </SectionTitle>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <CardBox>
          <CardBoxHeader
            title="Compromissos de Hoje"
            icon={CalendarClock}
            action={<SettingsButton label="Configurar compromissos" />}
          />
          <CardBoxBody className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
            <CalendarClock className="size-8" />
            <p>Nenhum compromisso agendado para hoje</p>
          </CardBoxBody>
        </CardBox>
      </SectionMain>
    </ShowcaseShell>
  );
}
