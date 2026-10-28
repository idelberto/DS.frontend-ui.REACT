'use client';

import { Toast } from '@base-ui/react/toast';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const TOAST_STYLES: Record<
  ToastType,
  { className: string; icon: ComponentType<{ className?: string }> }
> = {
  success: { className: 'bg-success text-success-foreground', icon: CircleCheck },
  error: { className: 'bg-destructive text-destructive-foreground', icon: CircleAlert },
  warning: { className: 'bg-warning text-warning-foreground', icon: TriangleAlert },
  info: { className: 'bg-info text-info-foreground', icon: Info },
};

function toastType(type: string | undefined): ToastType {
  if (type !== undefined && type in TOAST_STYLES) {
    return type as ToastType;
  }
  return 'info';
}

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => {
    const style = TOAST_STYLES[toastType(toast.type)];
    const Icon = style.icon;
    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-[opacity,translate] duration-200 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:opacity-0 ${style.className}`}
      >
        <Icon className="size-5 shrink-0" />
        <Toast.Content className="flex min-w-0 flex-1 flex-col">
          <Toast.Title className="text-sm font-semibold" />
          <Toast.Description className="text-sm" />
        </Toast.Content>
        <Toast.Close
          aria-label="Fechar"
          className="shrink-0 rounded-sm p-1 transition-colors hover:bg-current/20"
        >
          <X className="size-4" />
        </Toast.Close>
      </Toast.Root>
    );
  });
}

interface ToastProviderProps {
  children: ReactNode;
}

// Vai uma vez, em volta da aplicação. As telas mostram o aviso com o useToast().add({ title, type }),
// em que o type é 'success', 'error', 'warning' ou 'info'.
export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <Toast.Provider>
      {children}
      <Toast.Portal>
        <Toast.Viewport className="fixed top-4 right-4 z-[60] flex w-[min(25rem,calc(100vw-2rem))] flex-col gap-2">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

export const useToast = Toast.useToastManager;
