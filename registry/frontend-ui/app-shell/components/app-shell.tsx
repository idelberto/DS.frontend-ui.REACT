import type { CSSProperties, ReactNode } from 'react';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

// O w-72 do Admin One.
const SIDEBAR_WIDTH = { '--sidebar-width': '18rem' } as CSSProperties;

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
        {sidebar}
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 bg-background px-3">
            <SidebarTrigger className="size-9 text-foreground [&_svg]:size-5" />
            <div className="flex-1" />
            {actions}
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
