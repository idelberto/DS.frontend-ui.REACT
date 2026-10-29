// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { stubDesktopMatchMedia, stubMobileMatchMedia } from '../../../../test/match-media';
import { AppShell } from './app-shell';
import { AppSidebar } from './app-sidebar';

function renderShell() {
  render(
    <AppShell
      sidebar={
        <AppSidebar header={<p>Clínica</p>}>
          <nav aria-label="Menu principal" />
        </AppSidebar>
      }
    >
      <h1>Pacientes</h1>
    </AppShell>,
  );
}

describe('AppShell', () => {
  beforeEach(() => {
    stubDesktopMatchMedia();
  });

  afterEach(() => {
    cleanup();
  });

  it('starts with a link that skips the menu to the main content', () => {
    renderShell();

    const skipLink = screen.getAllByRole('link')[0];
    expect(skipLink?.textContent).toBe('Pular para o conteúdo');
    expect(skipLink?.getAttribute('href')).toBe('#main-content');
    expect(screen.getByRole('main').id).toBe('main-content');
  });

  it('tells whether the menu is open on the menu button', async () => {
    renderShell();
    const menuButton = screen.getByRole('button', { name: 'Abrir ou fechar o menu' });

    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    await userEvent.click(menuButton);

    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('shows the close button only in the phone drawer', () => {
    renderShell();

    expect(screen.queryByRole('button', { name: 'Fechar menu' })).toBeNull();
  });
});

describe('AppShell on the phone', () => {
  beforeEach(() => {
    stubMobileMatchMedia();
  });

  afterEach(() => {
    cleanup();
  });

  it('closes the menu drawer from its own button', async () => {
    renderShell();

    await userEvent.click(screen.getByRole('button', { name: 'Abrir ou fechar o menu' }));
    await userEvent.click(await screen.findByRole('button', { name: 'Fechar menu' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });
});
