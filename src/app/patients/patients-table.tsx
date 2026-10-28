'use client';

import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/registry/frontend-ui/button/ui/button';
import { PillTag } from '@/registry/frontend-ui/pill-tag/components/pill-tag';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/registry/frontend-ui/table/ui/table';
import {
  TablePagination,
  type PageLinkProps,
} from '@/registry/frontend-ui/table/components/table-pagination';
import {
  TableSelectAllCheckbox,
  TableSelection,
  TableSelectRowCheckbox,
  useTableSelection,
} from '@/registry/frontend-ui/table/components/table-selection';

import { PATIENTS, type Patient } from './patients';

const PAGE_SIZE = 8;
const PAGE_COUNT = Math.ceil(PATIENTS.length / PAGE_SIZE);

function currentPage(pageParam: string | null): number {
  const page = Number(pageParam);
  if (!Number.isInteger(page) || page < 1 || page > PAGE_COUNT) {
    return 1;
  }
  return page;
}

function renderPageLink(href: string, props: PageLinkProps) {
  return <Link href={href} {...props} />;
}

function SelectionBar() {
  const { selectedIds, clearSelection } = useTableSelection();

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-b px-3 py-3 lg:px-6">
      <span className="font-semibold">{selectedIds.length} selecionado(s)</span>
      <Button variant="destructive" size="sm" shape="pill">
        <Trash2 />
        Excluir selecionados
      </Button>
      <Button variant="ghost" size="sm" onClick={clearSelection}>
        Limpar seleção
      </Button>
    </div>
  );
}

function PatientRow({ patient }: { patient: Patient }) {
  return (
    <TableRow>
      <TableCell className="lg:w-12">
        <TableSelectRowCheckbox rowId={patient.id} label={patient.name} />
      </TableCell>
      <TableCell label="Nome">{patient.name}</TableCell>
      <TableCell label="E-mail">
        <PillTag tone="neutral" variant="soft" size="sm">
          {patient.email}
        </PillTag>
      </TableCell>
      <TableCell label="CPF">{patient.cpf}</TableCell>
      <TableCell label="Telefone">{patient.phone}</TableCell>
      <TableCell label="Nascimento">{patient.birthDate}</TableCell>
      <TableCell label="Status">
        {patient.isActive && (
          <PillTag tone="success" variant="soft" size="sm">
            Ativo
          </PillTag>
        )}
        {!patient.isActive && (
          <PillTag tone="danger" variant="soft" size="sm">
            Inativo
          </PillTag>
        )}
      </TableCell>
      <TableCell className="lg:w-12">
        <Button variant="ghost" size="icon-sm" aria-label={`Excluir ${patient.name}`}>
          <Trash2 className="text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function PatientsTable() {
  const page = currentPage(useSearchParams().get('page'));
  const pagePatients = PATIENTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <TableSelection rowIds={pagePatients.map((patient) => patient.id)}>
      <SelectionBar />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <TableSelectAllCheckbox />
            </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Nascimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Ações</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagePatients.map((patient) => (
            <PatientRow key={patient.id} patient={patient} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        pageCount={PAGE_COUNT}
        hrefForPage={(pageNumber) => `/patients/?page=${String(pageNumber)}`}
        renderLink={renderPageLink}
      />
    </TableSelection>
  );
}
