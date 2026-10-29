import { Gem, LogOut, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { AppShell } from '@/registry/frontend-ui/app-shell/components/app-shell';
import { AppSidebar } from '@/registry/frontend-ui/app-shell/components/app-sidebar';
import { FooterBar } from '@/registry/frontend-ui/footer-bar/components/footer-bar';

import { version } from '../../package.json';
import { ShowcaseNavigation } from './showcase-navigation';

function ShowcaseBrand() {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
          <Gem className="size-5" />
        </span>
        <span className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
          <span className="truncate text-base leading-tight font-semibold">frontend-ui</span>
          <span className="truncate text-xs leading-tight text-muted-foreground">
            Vitrine do design system
          </span>
        </span>
      </div>
      <p className="flex items-center gap-2 rounded-lg bg-sidebar-accent px-3 py-2 text-xs group-data-[collapsible=icon]:hidden">
        <MapPin className="size-4 shrink-0" />
        <span className="truncate">
          Unidade <strong className="font-semibold">Centro</strong>
        </span>
      </p>
    </>
  );
}

function ShowcaseSidebarFooter() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip="Sair"
          render={<Link href="/login/" />}
          className="h-11 gap-3 px-4 font-medium [&_svg]:size-[18px]"
        >
          <LogOut />
          <span>Sair</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function ShowcaseUser() {
  return (
    // Sem menu de usuário na vitrine: sem a seta, que prometia um menu que não abre. No celular, o
    // nome fica só para o leitor de tela, que não lia nada além das iniciais.
    <div className="flex items-center gap-2 px-2 text-sm font-medium">
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-bold"
      >
        MS
      </span>
      <span className="sr-only sm:not-sr-only">Maria Souza</span>
    </div>
  );
}

interface ShowcaseShellProps {
  children: ReactNode;
}

export function ShowcaseShell({ children }: ShowcaseShellProps) {
  return (
    <AppShell
      sidebar={
        <AppSidebar header={<ShowcaseBrand />} footer={<ShowcaseSidebarFooter />}>
          <ShowcaseNavigation />
        </AppSidebar>
      }
      actions={<ShowcaseUser />}
    >
      {children}
      <FooterBar name="frontend-ui" version={`v${version}`} />
    </AppShell>
  );
}
