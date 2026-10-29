// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { Modal, ModalClose } from './modal';

describe('Modal', () => {
  afterEach(() => {
    cleanup();
  });

  it('opens from the trigger and closes from the footer button', async () => {
    render(
      <Modal
        title="Excluir paciente?"
        trigger={<button type="button">Excluir</button>}
        footer={<ModalClose>Cancelar</ModalClose>}
      >
        O histórico continua guardado.
      </Modal>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Excluir' }));
    expect(screen.getByRole('dialog', { name: 'Excluir paciente?' })).toBeDefined();

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('describes the dialog with the description', async () => {
    render(
      <Modal
        title="Excluir paciente?"
        description="Ana sai da lista de pacientes."
        trigger={<button type="button">Excluir</button>}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Excluir' }));

    expect(
      screen.getByRole('dialog', {
        name: 'Excluir paciente?',
        description: 'Ana sai da lista de pacientes.',
      }),
    ).toBeDefined();
  });
});
