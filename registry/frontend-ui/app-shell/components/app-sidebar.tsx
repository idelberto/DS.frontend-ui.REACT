import type { ReactNode } from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';

import { AppSidebarClose } from './app-sidebar-close';

interface AppSidebarProps {
  // A marca e, se o projeto tiver, a unidade na segunda linha do nome.
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
      {/* O px-4 soma o px-2 do conteúdo e o p-2 do grupo: o ícone do "Sair" cai na coluna dos ícones
          do menu, e não 8px à esquerda. Recolhido, o conteúdo perde o px-2, e o rodapé também. */}
      {footer !== undefined && (
        <SidebarFooter className="border-t border-sidebar-border px-4 py-3 group-data-[collapsible=icon]:px-2">
          {footer}
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
