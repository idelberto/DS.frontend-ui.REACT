// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { House, Users } from 'lucide-react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { stubDesktopMatchMedia } from '../../../../test/match-media';
import { AppNavigation, isCurrentPath, type NavigationGroup } from './app-navigation';

const GROUPS: NavigationGroup[] = [
  { id: 'main', label: null, items: [{ id: 'home', label: 'Início', icon: House, href: '/' }] },
  {
    id: 'records',
    label: 'Cadastros',
    items: [
      { id: 'patients', label: 'Pacientes', icon: Users, href: '/patients' },
      { id: 'stock', label: 'Estoque', icon: Users, href: null },
    ],
  },
];

function renderNavigation(currentPath: string) {
  render(
    <SidebarProvider>
      <AppNavigation groups={GROUPS} currentPath={currentPath} />
    </SidebarProvider>,
  );
}

describe('AppNavigation', () => {
  beforeEach(() => {
    stubDesktopMatchMedia();
  });

  afterEach(() => {
    cleanup();
  });

  it('marks the item of the current page as the current link', () => {
    renderNavigation('/patients/new');

    expect(screen.getByRole('link', { name: 'Pacientes' }).getAttribute('aria-current')).toBe(
      'page',
    );
    expect(screen.getByRole('link', { name: 'Início' }).getAttribute('aria-current')).toBe('false');
  });

  it('shows an item without address as disabled, with "Em breve"', () => {
    renderNavigation('/');

    expect(screen.queryByRole('link', { name: /Estoque/ })).toBeNull();
    expect(screen.getByRole('button', { name: 'Estoque, em breve' })).toHaveProperty(
      'disabled',
      true,
    );
    expect(screen.getByText('Em breve')).toBeDefined();
  });

  it('shows the group label', () => {
    renderNavigation('/');

    expect(screen.getByText('Cadastros')).toBeDefined();
  });
});

describe('isCurrentPath', () => {
  it('matches the page and the pages under it, ignoring the trailing slash', () => {
    expect(isCurrentPath('/patients', '/patients/')).toBe(true);
    expect(isCurrentPath('/patients/', '/patients/42')).toBe(true);
    expect(isCurrentPath('/patients', '/patients-archive')).toBe(false);
  });

  it('matches the root only on the root', () => {
    expect(isCurrentPath('/', '/')).toBe(true);
    expect(isCurrentPath('/', '/patients')).toBe(false);
  });
});
