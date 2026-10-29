'use client';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

// O SidebarTrigger do shadcn não diz se o menu está aberto: o aria-expanded dá o estado ao leitor de
// tela, no desktop (menu recolhido) e no celular (a gaveta).
export function AppShellTrigger() {
  const { isMobile, open, openMobile } = useSidebar();
  let isExpanded = open;
  if (isMobile) {
    isExpanded = openMobile;
  }

  // No celular, o alvo tem 44px, o tamanho do polegar.
  return (
    <SidebarTrigger
      aria-expanded={isExpanded}
      className="size-11 text-foreground md:size-9 [&_svg]:size-5"
    />
  );
}
