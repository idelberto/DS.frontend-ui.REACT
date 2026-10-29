'use client';

import { X } from 'lucide-react';

import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/registry/frontend-ui/button/ui/button';

// A gaveta do celular cobre o gatilho da barra e só fechava com Esc ou tocando fora: o X dá a saída
// visível, como o mdiClose do menu do Admin One no tablet. No desktop o menu não é gaveta, e o X
// não aparece.
export function AppSidebarClose() {
  const { isMobile, setOpenMobile } = useSidebar();

  if (!isMobile) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Fechar menu"
      className="absolute top-3 right-3 size-11"
      onClick={() => {
        setOpenMobile(false);
      }}
    >
      <X />
    </Button>
  );
}
