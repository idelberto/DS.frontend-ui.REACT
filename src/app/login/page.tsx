import { Lock, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ShowcaseGuestBrand } from '@/components/showcase-guest-brand';
import { buttonVariants } from '@/registry/frontend-ui/button/ui/button';
import { Checkbox } from '@/registry/frontend-ui/checkbox/ui/checkbox';
import { FormField } from '@/registry/frontend-ui/form-field/components/form-field';
import { GuestLayout } from '@/registry/frontend-ui/guest-layout/components/guest-layout';
import { InputIcon } from '@/registry/frontend-ui/input/ui/input-icon';

export const metadata: Metadata = { title: 'Entrar' };

export default function LoginPage() {
  return (
    <GuestLayout brand={<ShowcaseGuestBrand />}>
      <h1 className="text-2xl">Entrar</h1>
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
      {/* Na vitrine não há sessão: o Entrar só leva ao painel. */}
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/dashboard/" className={buttonVariants()}>
          Entrar
        </Link>
        <Link href="/forgot-password/" className={buttonVariants({ variant: 'link' })}>
          Esqueci a senha
        </Link>
      </div>
    </GuestLayout>
  );
}
