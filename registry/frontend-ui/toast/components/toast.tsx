'use client';

import {
  Toast,
  type ToastManagerAddOptions,
  type UseToastManagerReturnValue,
} from '@base-ui/react/toast';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import { useMemo, type ComponentType, type ReactNode } from 'react';

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
        className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-[opacity,translate] duration-200 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:opacity-0 motion-reduce:transition-none ${style.className}`}
      >
        <Icon className="size-5 shrink-0" />
        <Toast.Content className="flex min-w-0 flex-1 flex-col">
          <Toast.Title className="text-sm font-semibold" />
          <Toast.Description className="text-sm" />
        </Toast.Content>
        {/* Sobre a cor cheia do aviso, o anel de foco vai na cor do texto: o da marca sumiria. */}
        <Toast.Close
          aria-label="Fechar"
          className="shrink-0 rounded-sm p-1 transition-colors outline-none hover:bg-current/20 focus-visible:ring-3 focus-visible:ring-current"
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
        {/* O nome padrão da região no Base UI é "Notifications", em inglês. */}
        <Toast.Viewport
          aria-label="Avisos"
          className="fixed top-4 right-4 z-[60] flex w-[min(25rem,calc(100vw-2rem))] flex-col gap-2"
        >
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

// O erro é anunciado com urgência e fica até a pessoa fechar; os outros somem em 5 s, o padrão do
// Base UI. Quem chama pode passar outro priority ou timeout.
const ERROR_DEFAULTS = { priority: 'high', timeout: 0 } as const;

function withErrorDefaults<Data extends object>(
  options: ToastManagerAddOptions<Data>,
): ToastManagerAddOptions<Data> {
  if (options.type === 'error') {
    return { ...ERROR_DEFAULTS, ...options };
  }
  return options;
}

export function useToast(): UseToastManagerReturnValue {
  const toastManager = Toast.useToastManager();

  return useMemo(
    () => ({
      ...toastManager,
      add: (options) => toastManager.add(withErrorDefaults(options)),
    }),
    [toastManager],
  );
}
