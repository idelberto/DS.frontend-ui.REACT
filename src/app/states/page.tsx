import { CircleDashed, Plus, Users, Wallet } from 'lucide-react';
import type { Metadata } from 'next';

import { ShowcaseShell } from '@/components/showcase-shell';
import { Button } from '@/registry/frontend-ui/button/ui/button';
import { EmptyState } from '@/registry/frontend-ui/empty-state/components/empty-state';
import { LoadingState } from '@/registry/frontend-ui/loading-state/components/loading-state';
import { SectionMain } from '@/registry/frontend-ui/section-main/components/section-main';
import { SectionTitle } from '@/registry/frontend-ui/section-title/components/section-title';
import { StatCard } from '@/registry/frontend-ui/stat-group/components/stat-group';

import { ErrorStateDemo } from './error-state-demo';

export const metadata: Metadata = { title: 'Estados' };

export default function StatesPage() {
  return (
    <ShowcaseShell>
      <SectionMain>
        <SectionTitle icon={CircleDashed} title="Estados" />

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl">Carregando</h2>
          <LoadingState />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl">Vazio</h2>
          <EmptyState
            icon={Users}
            title="Nenhum paciente ainda"
            description="Cadastre o primeiro paciente para começar a agenda."
          >
            <Button size="sm" shape="pill">
              <Plus />
              Novo paciente
            </Button>
          </EmptyState>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl">Indicadores carregando e sem dado</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <StatCard label="Vendas" value={null} icon={Wallet} loading />
            <StatCard label="Clientes novos" value={null} icon={Users} />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl">Erro</h2>
          <ErrorStateDemo />
        </section>
      </SectionMain>
    </ShowcaseShell>
  );
}
