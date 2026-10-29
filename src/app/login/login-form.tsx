'use client';

import { Lock, LogIn, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { SubmitEvent } from 'react';

import { Button, buttonVariants } from '@/registry/frontend-ui/button/ui/button';
import { Checkbox } from '@/registry/frontend-ui/checkbox/ui/checkbox';
import { FormField } from '@/registry/frontend-ui/form-field/components/form-field';
import { InputIcon } from '@/registry/frontend-ui/input/ui/input-icon';

// Um <form> de verdade: o Enter na senha envia, como num login real. Na vitrine não há sessão, e o
// envio só leva ao painel.
export function LoginForm() {
  const router = useRouter();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push('/dashboard/');
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <FormField label="E-mail">
          <InputIcon icon={Mail} name="email" type="email" autoComplete="email" />
        </FormField>
        <FormField label="Senha">
          <InputIcon icon={Lock} name="password" type="password" autoComplete="current-password" />
        </FormField>
        <label className="flex items-center gap-2">
          <Checkbox name="remember" />
          Lembrar de mim
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link href="/forgot-password/" className={buttonVariants({ variant: 'link' })}>
          Esqueci a senha
        </Link>
        <Button type="submit" className="min-w-32">
          <LogIn />
          Entrar
        </Button>
      </div>
    </form>
  );
}
