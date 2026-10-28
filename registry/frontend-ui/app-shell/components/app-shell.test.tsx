// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { stubDesktopMatchMedia } from '../../../../test/match-media';
import { AppShell } from './app-shell';

function renderShell() {
  render(
    <AppShell sidebar={<nav aria-label="Menu principal" />}>
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
});
