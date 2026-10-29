import type { Metadata } from 'next';

import { SiteHeader } from '@/components/site-header';

import { BrandPicker } from './brand-picker';
import { ThemeSample } from './theme-sample';

export const metadata: Metadata = { title: 'Tema' };

const COLOR_TOKENS = [
  'brand',
  'brand-foreground',
  'brand-muted',
  'brand-muted-foreground',
  'background',
  'foreground',
  'card',
  'primary',
  'secondary',
  'muted',
  'muted-foreground',
  'accent',
  'destructive',
  'border',
  'input',
  'sidebar',
  'sidebar-foreground',
  'sidebar-accent',
  'sidebar-border',
] as const;

const RADII = [
  { className: 'rounded-sm', usage: 'botão quadrado e campo' },
  { className: 'rounded-lg', usage: 'item do menu' },
  { className: 'rounded-2xl', usage: 'card e menu lateral' },
  { className: 'rounded-full', usage: 'botão e selo' },
] as const;

function Swatch({ token }: { token: string }) {
  return (
    <div
      className="h-8 w-full rounded-sm border border-foreground/10"
      style={{ backgroundColor: `var(--${token})` }}
    />
  );
}

export default function ThemePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Tema</h1>
          <p className="text-muted-foreground">
            O item <code>@frontend-ui/theme</code> traz as cores do claro e do escuro do Admin One.
            A marca é a variável <code>--brand</code>: o projeto troca o valor dela, e os derivados
            acompanham.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Marca</h2>
          <BrandPicker />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Claro</h2>
            <ThemeSample />
          </div>
          <div className="dark flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Escuro</h2>
            <ThemeSample />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Cores</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2 font-semibold">Variável</th>
                <th className="py-2 font-semibold">Claro</th>
                <th className="py-2 font-semibold">Escuro</th>
              </tr>
            </thead>
            <tbody>
              {COLOR_TOKENS.map((token) => (
                <tr key={token}>
                  <td className="py-1 pr-4">
                    <code>--{token}</code>
                  </td>
                  <td className="w-1/3 py-1 pr-4">
                    <Swatch token={token} />
                  </td>
                  <td className="dark w-1/3 py-1">
                    <Swatch token={token} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Raio</h2>
          <p className="text-muted-foreground">
            A base é <code>--radius: 0.5rem</code>, e a escala do shadcn sai dela.
          </p>
          <div className="flex flex-wrap gap-6">
            {RADII.map((radius) => (
              <div key={radius.className} className="flex flex-col items-center gap-2 text-sm">
                <div className={`size-20 bg-primary ${radius.className}`} />
                <code>{radius.className}</code>
                <span className="text-muted-foreground">{radius.usage}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Fonte</h2>
          <p className="text-muted-foreground">
            O tema usa a <code>--font-sans</code>, que o projeto carrega (aqui, a Nunito pelo{' '}
            <code>next/font</code>).
          </p>
          <p className="text-2xl">Regular: Gestão de clínicas estéticas</p>
          <p className="text-2xl font-semibold">Semibold: Gestão de clínicas estéticas</p>
          <p className="text-2xl font-bold">Bold: Gestão de clínicas estéticas</p>
        </section>
      </main>
    </>
  );
}
