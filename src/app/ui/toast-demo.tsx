'use client';

import { Button } from '@/registry/frontend-ui/button/ui/button';
import { useToast } from '@/registry/frontend-ui/toast/components/toast';

const TOAST_EXAMPLES = [
  { type: 'success', label: 'Aviso de sucesso', title: 'Paciente salvo.', variant: 'success' },
  {
    type: 'error',
    label: 'Aviso de erro',
    title: 'Não deu para salvar o paciente.',
    variant: 'destructive',
  },
  {
    type: 'warning',
    label: 'Aviso de alerta',
    title: 'O plano termina em 3 dias.',
    variant: 'warning',
  },
  { type: 'info', label: 'Aviso de informação', title: 'Nova versão disponível.', variant: 'info' },
] as const;

export function ToastDemo() {
  const toastManager = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      {TOAST_EXAMPLES.map((example) => (
        <Button
          key={example.type}
          variant={example.variant}
          shape="pill"
          onClick={() => {
            toastManager.add({ title: example.title, type: example.type });
          }}
        >
          {example.label}
        </Button>
      ))}
    </div>
  );
}
