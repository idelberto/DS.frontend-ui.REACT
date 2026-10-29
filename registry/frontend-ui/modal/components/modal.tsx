'use client';

import { Dialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import type { ReactElement, ReactNode } from 'react';

import { Button } from '@/registry/frontend-ui/button/ui/button';

interface ModalProps {
  title: string;
  children: ReactNode;
  // O botão que abre o modal. Sem ele, o modal é controlado pelo open e pelo onOpenChange.
  trigger?: ReactElement;
  // Os botões do rodapé. O de cancelar é um ModalClose.
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({ title, children, trigger, footer, open, onOpenChange }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger !== undefined && <Dialog.Trigger render={trigger} />}
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/70 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-10rem)] w-11/12 -translate-1/2 flex-col gap-6 overflow-y-auto rounded-2xl bg-popover p-6 text-popover-foreground shadow-lg transition-[opacity,scale] duration-150 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 md:w-3/5 lg:w-2/5 xl:w-1/3">
          <div className="flex items-center justify-between gap-3">
            <Dialog.Title className="text-2xl">{title}</Dialog.Title>
            <Dialog.Close
              render={<Button variant="secondary" size="icon-sm" shape="pill" />}
              aria-label="Fechar"
            >
              <X />
            </Dialog.Close>
          </div>
          <div className="flex flex-col gap-3">{children}</div>
          {footer !== undefined && <div className="flex flex-wrap gap-3">{footer}</div>}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const ModalClose = Dialog.Close;
