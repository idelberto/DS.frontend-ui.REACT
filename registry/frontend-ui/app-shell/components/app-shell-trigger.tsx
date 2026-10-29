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

  return (
    <SidebarTrigger aria-expanded={isExpanded} className="size-9 text-foreground [&_svg]:size-5" />
  );
}
