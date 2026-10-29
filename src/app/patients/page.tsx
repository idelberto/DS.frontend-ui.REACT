import { Plus, Users } from 'lucide-react';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ShowcaseShell } from '@/components/showcase-shell';
import { Button } from '@/registry/frontend-ui/button/ui/button';
import { CardBox } from '@/registry/frontend-ui/card-box/components/card-box';
import { LoadingState } from '@/registry/frontend-ui/loading-state/components/loading-state';
import { SectionMain } from '@/registry/frontend-ui/section-main/components/section-main';
import { SectionTitle } from '@/registry/frontend-ui/section-title/components/section-title';

import { PatientsTable } from './patients-table';

export const metadata: Metadata = { title: 'Pacientes' };

export default function PatientsPage() {
  return (
    <ShowcaseShell>
      <SectionMain>
        <SectionTitle icon={Users} title="Central de Pacientes">
          <Button size="sm" shape="pill">
            <Plus />
            Novo
          </Button>
        </SectionTitle>

        {/* O export estático só conhece a página na hora de rodar: a tabela lê o ?page no navegador. */}
        <Suspense fallback={<LoadingState />}>
          <CardBox className="overflow-hidden">
            <PatientsTable />
          </CardBox>
        </Suspense>
      </SectionMain>
    </ShowcaseShell>
  );
}
