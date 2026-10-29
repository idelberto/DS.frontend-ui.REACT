import type { ReactNode } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  // A marca e, abaixo dela, o seletor de unidade, se o projeto tiver.
  header: ReactNode;
  // O menu: em geral o AppNavigation.
  children: ReactNode;
  // O fim do menu, como o "Sair".
  footer?: ReactNode;
}

export function AppSidebar({ header, children, footer }: AppSidebarProps) {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="**:data-[slot=sidebar-inner]:rounded-2xl **:data-[slot=sidebar-inner]:shadow-xl"
    >
      <SidebarHeader className="gap-3 border-b border-sidebar-border px-3 py-4">
        {header}
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">{children}</SidebarContent>
      {footer !== undefined && (
        <SidebarFooter className="border-t border-sidebar-border px-2 py-3">{footer}</SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
