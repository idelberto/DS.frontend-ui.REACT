import { Palette } from 'lucide-react';
import type { Metadata } from 'next';

import { ShowcaseShell } from '@/components/showcase-shell';
import { SectionMain } from '@/registry/frontend-ui/section-main/components/section-main';
import { SectionTitle } from '@/registry/frontend-ui/section-title/components/section-title';

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
    // Dentro do shell, como as outras páginas do menu: o "Tema" do menu levava a outro layout.
    <ShowcaseShell>
      <SectionMain>
        <SectionTitle icon={Palette} title="Tema" />
        <p className="max-w-prose text-pretty text-muted-foreground">
          O item <code>@frontend-ui/theme</code> traz as cores do claro e do escuro do Admin One. A
          marca é a variável <code>--brand</code>: o projeto troca o valor dela, e os derivados
          acompanham.
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Marca</h2>
          <BrandPicker />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {/* O min-w-0 deixa a amostra encolher no celular: sem ele, a página rolava de lado a 320px. */}
          <div className="flex min-w-0 flex-col gap-2">
            <h2 className="text-xl font-semibold">Claro</h2>
            <ThemeSample />
          </div>
          <div className="dark flex min-w-0 flex-col gap-2">
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
                  {/* O fundo do escuro atrás da amostra: a cor transparente (brand-muted) muda
                      com o que está por trás. */}
                  <td className="dark w-1/3 bg-background px-2 py-1">
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
      </SectionMain>
    </ShowcaseShell>
  );
}
