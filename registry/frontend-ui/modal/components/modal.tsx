'use client';

import { Dialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import type { ReactElement, ReactNode } from 'react';

import { Button } from '@/registry/frontend-ui/button/ui/button';

interface ModalProps {
  title: string;
  // A frase que explica o modal: o leitor de tela a ouve junto com o título ao abrir.
  description?: string;
  children?: ReactNode;
  // O botão que abre o modal. Sem ele, o modal é controlado pelo open e pelo onOpenChange.
  trigger?: ReactElement;
  // Os botões do rodapé. O de cancelar é um ModalClose.
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({
  title,
  description,
  children,
  trigger,
  footer,
  open,
  onOpenChange,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger !== undefined && <Dialog.Trigger render={trigger} />}
      <Dialog.Portal>
        {/* O degradê do Admin One (gray-700, gray-900, gray-700 a 90%): o --overlay é o gray-900, e as
            pontas mais claras saem da transparência maior. */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-linear-to-tr from-overlay/80 via-overlay/90 to-overlay/80 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-10rem)] w-11/12 -translate-1/2 flex-col gap-6 overflow-y-auto rounded-2xl bg-popover p-6 text-popover-foreground shadow-lg transition-[opacity,scale] duration-150 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none md:w-3/5 lg:w-2/5 xl:w-1/3">
          <div className="flex items-center justify-between gap-3">
            <Dialog.Title className="text-2xl">{title}</Dialog.Title>
            {/* O X simples do Admin One, sem fundo em repouso. */}
            <Dialog.Close
              render={<Button variant="ghost" size="icon-sm" shape="pill" />}
              aria-label="Fechar"
            >
              <X />
            </Dialog.Close>
          </div>
          {(description !== undefined || children !== undefined) && (
            <div className="flex flex-col gap-3">
              {description !== undefined && <Dialog.Description>{description}</Dialog.Description>}
              {children}
            </div>
          )}
          {footer !== undefined && <div className="flex flex-wrap gap-3">{footer}</div>}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const ModalClose = Dialog.Close;
