import {
  CalendarClock,
  ChartColumn,
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
import { Stat, StatGroup } from '@/registry/frontend-ui/stat-group/components/stat-group';

export const metadata: Metadata = { title: 'Painel' };

interface Indicator {
  label: string;
  value: string;
  trend: { label: string; tone: 'success' | 'danger' | 'warning'; icon: LucideIcon };
  icon: LucideIcon;
  tone: 'success' | 'info' | 'danger';
}

const STATS: Indicator[] = [
  {
    label: 'Pacientes',
    value: '512',
    trend: { label: '12%', tone: 'success', icon: TrendingUp },
    icon: Users,
    tone: 'success',
  },
  {
    label: 'Atendimentos',
    value: '38',
    trend: { label: '8%', tone: 'danger', icon: TrendingDown },
    icon: Stethoscope,
    tone: 'info',
  },
  {
    label: 'Faturamento',
    value: 'R$ 7.770',
    trend: { label: 'Meta', tone: 'warning', icon: CircleAlert },
    icon: HandCoins,
    tone: 'danger',
  },
];

function SettingsButton({ label }: { label: string }) {
  return (
    // O ícone simples do Admin One, sem fundo em repouso.
    <Button variant="ghost" size="icon-sm" className="text-muted-foreground" aria-label={label}>
      <Settings />
    </Button>
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

        <StatGroup
          title="Indicadores"
          icon={ChartColumn}
          action={<SettingsButton label="Configurar indicadores" />}
        >
          {STATS.map((stat) => (
            <Stat
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              tone={stat.tone}
              trend={
                <PillTag tone={stat.trend.tone} size="sm" icon={stat.trend.icon}>
                  {stat.trend.label}
                </PillTag>
              }
            />
          ))}
        </StatGroup>

        <CardBox>
          <CardBoxHeader
            title="Compromissos de Hoje"
            icon={CalendarClock}
            action={<SettingsButton label="Configurar compromissos" />}
          />
          <CardBoxBody className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
            <CalendarClock className="size-8" />
            <p className="text-pretty">Nenhum compromisso agendado para hoje</p>
          </CardBoxBody>
        </CardBox>
      </SectionMain>
    </ShowcaseShell>
  );
}
