import { describe, expect, it } from 'vitest';

import registry from '../registry.json';

// A marca e o raio valem para os dois modos. O resto precisa estar no .dark: o shadcn init do
// consumidor já tem um .dark com os próprios valores, e o que o tema não sobrescreve fica com o
// cinza do shadcn no escuro.
const SHARED_BETWEEN_MODES = new Set(['brand', 'brand-foreground', 'radius']);

describe('theme item', () => {
  const theme = registry.items.find((item) => item.name === 'theme');

  it('overrides in dark mode every light variable that changes with the mode', () => {
    const lightVariables = Object.keys(theme?.cssVars.light ?? {});
    const darkVariables = new Set(Object.keys(theme?.cssVars.dark ?? {}));

    const missingInDark = lightVariables.filter(
      (name) => !SHARED_BETWEEN_MODES.has(name) && !darkVariables.has(name),
    );

    expect(missingInDark).toEqual([]);
  });
});
