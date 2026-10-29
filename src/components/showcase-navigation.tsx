'use client';

import {
  CalendarDays,
  LayoutDashboard,
  LayoutTemplate,
  Palette,
  Receipt,
  Sparkles,
  SquarePen,
  Stethoscope,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  AppNavigation,
  type NavigationGroup,
} from '@/registry/frontend-ui/app-shell/components/app-navigation';

const SHOWCASE_NAVIGATION: NavigationGroup[] = [
  {
    id: 'showcase',
    label: null,
    items: [
      { id: 'dashboard', label: 'Painel', icon: LayoutDashboard, href: '/dashboard/' },
      { id: 'forms', label: 'Formulários', icon: SquarePen, href: '/forms/' },
      { id: 'ui', label: 'Interface', icon: LayoutTemplate, href: '/ui/' },
      { id: 'theme', label: 'Tema', icon: Palette, href: '/theme/' },
    ],
  },
  {
    id: 'records',
    label: 'Cadastros',
    items: [
      { id: 'patients', label: 'Pacientes', icon: Users, href: null },
      { id: 'professionals', label: 'Profissionais', icon: Stethoscope, href: null },
      { id: 'procedures', label: 'Procedimentos', icon: Sparkles, href: null },
    ],
  },
  {
    id: 'operations',
    label: 'Operação',
    items: [
      { id: 'appointments', label: 'Agendamentos', icon: CalendarDays, href: null },
      { id: 'billing', label: 'Faturamento', icon: Receipt, href: null },
    ],
  },
];

function renderNextLink(href: string) {
  return <Link href={href} />;
}

export function ShowcaseNavigation() {
  const pathname = usePathname();

  return (
    <AppNavigation
      groups={SHOWCASE_NAVIGATION}
      currentPath={pathname}
      renderLink={renderNextLink}
    />
  );
}
