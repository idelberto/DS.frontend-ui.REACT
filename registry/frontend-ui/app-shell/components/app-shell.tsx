import type { CSSProperties, ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

import { AppShellTrigger } from './app-shell-trigger';

// O w-72 do Admin One.
const SIDEBAR_WIDTH = { '--sidebar-width': '18rem' } as CSSProperties;

const MAIN_CONTENT_ID = 'main-content';

interface AppShellProps {
  // O AppSidebar, com a marca e o menu.
  sidebar: ReactNode;
  children: ReactNode;
  // O lado direito da barra superior, como o menu do usuário.
  actions?: ReactNode;
  // Menu aberto ou recolhido no desktop. O shadcn grava a escolha no cookie sidebar_state: ler no
  // servidor evita o menu piscar.
  defaultOpen?: boolean;
}

export function AppShell({ sidebar, children, actions, defaultOpen = true }: AppShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={defaultOpen} style={SIDEBAR_WIDTH}>
        {/* Primeiro Tab da página: pula os itens do menu. Fica acima da tela até receber o foco. */}
        <a
          href={`#${MAIN_CONTENT_ID}`}
          className="fixed top-4 left-4 z-50 -translate-y-24 rounded-sm bg-card px-4 py-2 font-medium text-card-foreground shadow-lg outline-none focus:translate-y-0 focus-visible:ring-3 focus-visible:ring-ring"
        >
          Pular para o conteúdo
        </a>
        {sidebar}
        {/* O scroll-mt nos descendentes: ao voltar com Shift+Tab, o elemento focado para abaixo da
            barra fixa, e não embaixo dela. */}
        <SidebarInset
          id={MAIN_CONTENT_ID}
          tabIndex={-1}
          className="outline-none [&_*]:scroll-mt-18"
        >
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 bg-background px-3">
            <AppShellTrigger />
            <div className="flex-1" />
            {actions}
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
