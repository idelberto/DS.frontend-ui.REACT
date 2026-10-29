// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { ToastProvider, useToast } from './toast';

function SaveButton() {
  const toastManager = useToast();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          toastManager.add({ title: 'Paciente salvo.', type: 'success' });
        }}
      >
        Salvar
      </button>
      <button
        type="button"
        onClick={() => {
          toastManager.add({ title: 'Não deu para salvar.', type: 'error' });
        }}
      >
        Falhar
      </button>
    </>
  );
}

describe('ToastProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows the toast that a screen adds', async () => {
    render(
      <ToastProvider>
        <SaveButton />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    expect(await screen.findByText('Paciente salvo.')).toBeDefined();
  });

  it('names the toast region in Portuguese', () => {
    render(
      <ToastProvider>
        <SaveButton />
      </ToastProvider>,
    );

    expect(screen.getByRole('region', { name: 'Avisos' })).toBeDefined();
  });

  it('announces an error toast urgently', async () => {
    render(
      <ToastProvider>
        <SaveButton />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Falhar' }));

    // O Base UI esconde o toast urgente da árvore até ele receber o foco e o anuncia à parte.
    const errorToast = await screen.findByRole('alertdialog', { hidden: true });
    expect(errorToast.textContent).toContain('Não deu para salvar.');
  });
});
