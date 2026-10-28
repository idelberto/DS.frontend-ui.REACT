// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { ToastProvider, useToast } from './toast';

function SaveButton() {
  const toastManager = useToast();
  return (
    <button
      type="button"
      onClick={() => {
        toastManager.add({ title: 'Paciente salvo.', type: 'success' });
      }}
    >
      Salvar
    </button>
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
});
