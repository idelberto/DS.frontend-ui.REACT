'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import { Checkbox } from '@/registry/frontend-ui/checkbox/ui/checkbox';

interface TableSelectionState {
  rowIds: readonly string[];
  selectedIds: ReadonlySet<string>;
  setSelectedIds: (selectedIds: ReadonlySet<string>) => void;
}

const TableSelectionContext = createContext<TableSelectionState | null>(null);

function useTableSelectionState(): TableSelectionState {
  const state = useContext(TableSelectionContext);
  if (state === null) {
    throw new Error('A seleção da tabela precisa estar dentro do TableSelection.');
  }
  return state;
}

interface TableSelectionProps {
  // Os ids das linhas da página. O que foi marcado e saiu da página deixa de contar.
  rowIds: readonly string[];
  children: ReactNode;
}

export function TableSelection({ rowIds, children }: TableSelectionProps) {
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(() => new Set());

  return (
    <TableSelectionContext value={{ rowIds, selectedIds, setSelectedIds }}>
      {children}
    </TableSelectionContext>
  );
}

// As linhas marcadas, para a ação em lote (excluir, exportar).
export function useTableSelection() {
  const { rowIds, selectedIds, setSelectedIds } = useTableSelectionState();

  return {
    selectedIds: rowIds.filter((id) => selectedIds.has(id)),
    clearSelection: () => {
      setSelectedIds(new Set());
    },
  };
}

export function TableSelectAllCheckbox() {
  const { rowIds, selectedIds, setSelectedIds } = useTableSelectionState();
  const selectedCount = rowIds.filter((id) => selectedIds.has(id)).length;
  const isAllSelected = rowIds.length > 0 && selectedCount === rowIds.length;

  return (
    <Checkbox
      aria-label="Selecionar todas as linhas"
      checked={isAllSelected}
      indeterminate={selectedCount > 0 && !isAllSelected}
      onCheckedChange={(checked) => {
        if (checked) {
          setSelectedIds(new Set(rowIds));
          return;
        }
        setSelectedIds(new Set());
      }}
    />
  );
}

interface TableSelectRowCheckboxProps {
  rowId: string;
  // O que identifica a linha para o leitor de tela, como o nome do paciente.
  label: string;
}

export function TableSelectRowCheckbox({ rowId, label }: TableSelectRowCheckboxProps) {
  const { selectedIds, setSelectedIds } = useTableSelectionState();

  return (
    <Checkbox
      aria-label={`Selecionar ${label}`}
      checked={selectedIds.has(rowId)}
      onCheckedChange={(checked) => {
        const nextSelectedIds = new Set(selectedIds);
        if (checked) {
          nextSelectedIds.add(rowId);
        } else {
          nextSelectedIds.delete(rowId);
        }
        setSelectedIds(nextSelectedIds);
      }}
    />
  );
}
