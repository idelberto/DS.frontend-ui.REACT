'use client';

import { Mail } from 'lucide-react';
import Link from 'next/link';
import type { SubmitEvent } from 'react';

import { Button, buttonVariants } from '@/registry/frontend-ui/button/ui/button';
import { FormField } from '@/registry/frontend-ui/form-field/components/form-field';
import { InputIcon } from '@/registry/frontend-ui/input/ui/input-icon';
import { useToast } from '@/registry/frontend-ui/toast/components/toast';

// Sem o onSubmit, o formulário recarregava a página sem retorno. Na vitrine não há envio: o aviso
// mostra o que a tela real diria, sem contar se o e-mail tem cadastro.
export function ForgotPasswordForm() {
  const toastManager = useToast();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    toastManager.add({
      title: 'Se o e-mail tiver cadastro, o link chega em alguns minutos.',
      type: 'success',
    });
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FormField label="E-mail">
        <InputIcon icon={Mail} name="email" type="email" autoComplete="email" />
      </FormField>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link href="/login/" className={buttonVariants({ variant: 'link' })}>
          Voltar para o login
        </Link>
        <Button type="submit">Enviar link</Button>
      </div>
    </form>
  );
}
