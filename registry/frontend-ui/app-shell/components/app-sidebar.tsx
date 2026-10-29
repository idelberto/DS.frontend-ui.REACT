import type { ReactNode } from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';

import { AppSidebarClose } from './app-sidebar-close';

interface AppSidebarProps {
  // A marca e, abaixo dela, o seletor de unidade, se o projeto tiver.
  header: ReactNode;
  // O menu: em geral o AppNavigation.
  children: ReactNode;
  // O fim do menu, como o "Sair".
  footer?: ReactNode;
}

// Sem o SidebarRail do shadcn: o Admin One não tem a faixa invisível na borda do menu, e ela é um
// alvo de 16px colado nos ícones do menu recolhido. O menu abre e recolhe pelo gatilho da barra.
// Sem o contorno de 1px do floating: o Admin One só tem a sombra.
export function AppSidebar({ header, children, footer }: AppSidebarProps) {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="**:data-[slot=sidebar-inner]:rounded-2xl **:data-[slot=sidebar-inner]:shadow-xl **:data-[slot=sidebar-inner]:ring-0"
    >
      {/* No celular, o pr-14 abre espaço para o X da gaveta. Recolhido, o menu tem 3rem: os recuos
          de aberto empurravam a marca e os ícones para fora do centro. */}
      <SidebarHeader className="relative gap-3 border-b border-sidebar-border px-3 py-4 group-data-[collapsible=icon]:px-1 in-data-[mobile=true]:pr-14">
        {header}
        <AppSidebarClose />
      </SidebarHeader>
      <SidebarContent className="px-2 py-2 group-data-[collapsible=icon]:px-0">
        {children}
      </SidebarContent>
      {footer !== undefined && (
        <SidebarFooter className="border-t border-sidebar-border px-2 py-3">{footer}</SidebarFooter>
      )}
    </Sidebar>
  );
}
