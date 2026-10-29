import type { Metadata } from 'next';

import { ShowcaseGuestBrand } from '@/components/showcase-guest-brand';
import { GuestLayout } from '@/registry/frontend-ui/guest-layout/components/guest-layout';

import { LoginForm } from './login-form';

export const metadata: Metadata = { title: 'Entrar' };

export default function LoginPage() {
  return (
    <GuestLayout brand={<ShowcaseGuestBrand />}>
      <h1 className="text-2xl">Entrar</h1>
      <LoginForm />
    </GuestLayout>
  );
}
