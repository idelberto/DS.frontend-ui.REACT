// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { NotificationBar } from './notification-bar';

describe('NotificationBar', () => {
  afterEach(() => {
    cleanup();
  });

  it('closes when the close button is clicked', async () => {
    render(<NotificationBar tone="success">Paciente salvo.</NotificationBar>);

    await userEvent.click(screen.getByRole('button', { name: 'Fechar aviso' }));

    expect(screen.queryByText('Paciente salvo.')).toBeNull();
  });

  it('moves the focus to the next control when it closes', async () => {
    render(
      <>
        <NotificationBar tone="success">Paciente salvo.</NotificationBar>
        <button type="button">Novo paciente</button>
      </>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Fechar aviso' }));

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Novo paciente' }));
  });

  it('moves the focus back when it is the last control of the page', async () => {
    render(
      <>
        <button type="button">Voltar</button>
        <NotificationBar tone="success">Paciente salvo.</NotificationBar>
      </>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Fechar aviso' }));

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Voltar' }));
  });

  it('shows the action in place of the close button', () => {
    render(
      <NotificationBar tone="info" action={<button type="button">Ver novidades</button>}>
        Nova versão.
      </NotificationBar>,
    );

    expect(screen.getByRole('button', { name: 'Ver novidades' })).toBeDefined();
    expect(screen.queryByRole('button', { name: 'Fechar aviso' })).toBeNull();
  });
});
