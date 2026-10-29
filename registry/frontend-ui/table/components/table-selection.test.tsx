// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import {
  TableSelectAllCheckbox,
  TableSelection,
  TableSelectRowCheckbox,
  useTableSelection,
} from './table-selection';

const ROWS = [
  { id: 'p01', name: 'Ana' },
  { id: 'p02', name: 'Bruno' },
];

function SelectedCount() {
  const { selectedIds } = useTableSelection();
  return <p>{selectedIds.length} selecionados</p>;
}

function renderSelection() {
  render(
    <TableSelection rowIds={ROWS.map((row) => row.id)}>
      <TableSelectAllCheckbox />
      {ROWS.map((row) => (
        <TableSelectRowCheckbox key={row.id} rowId={row.id} label={row.name} />
      ))}
      <SelectedCount />
    </TableSelection>,
  );
}

describe('TableSelection', () => {
  afterEach(() => {
    cleanup();
  });

  it('selects every row from the header checkbox', async () => {
    renderSelection();

    await userEvent.click(screen.getByRole('checkbox', { name: 'Selecionar todas as linhas' }));

    expect(screen.getByText('2 selecionados')).toBeDefined();
    expect(
      screen.getByRole('checkbox', { name: 'Selecionar Ana' }).getAttribute('aria-checked'),
    ).toBe('true');
  });

  it('marks the header checkbox as mixed when only some rows are selected', async () => {
    renderSelection();

    await userEvent.click(screen.getByRole('checkbox', { name: 'Selecionar Bruno' }));

    expect(screen.getByText('1 selecionados')).toBeDefined();
    expect(
      screen
        .getByRole('checkbox', { name: 'Selecionar todas as linhas' })
        .getAttribute('aria-checked'),
    ).toBe('mixed');
  });
});
