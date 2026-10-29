'use client';

import { useEffect, useState } from 'react';

import { RadioGroup, RadioGroupItem } from '@/registry/frontend-ui/radio-group/ui/radio-group';

// Toda marca precisa de 4,5:1 com o texto branco (docs/TOKENS.md): por isso o verde e o laranja
// são os -700, e não os -600.
export const BRAND_PRESETS = [
  { name: 'Azul do Admin One', value: 'oklch(0.546 0.245 262.881)' },
  { name: 'Roxo do BioStar4Life', value: 'oklch(0.558 0.288 302.321)' },
  { name: 'Verde', value: 'oklch(0.508 0.118 165.612)' },
  { name: 'Laranja', value: 'oklch(0.553 0.195 38.402)' },
] as const;

const DEFAULT_BRAND = BRAND_PRESETS[0].value;

// O radio-group do design system: as setas e o leitor de tela vêm do Base UI, como a regra pede.
export function BrandPicker() {
  const [selectedBrand, setSelectedBrand] = useState<string>(DEFAULT_BRAND);

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--brand');
    };
  }, []);

  function chooseBrand(value: unknown) {
    if (typeof value !== 'string') {
      return;
    }
    document.documentElement.style.setProperty('--brand', value);
    setSelectedBrand(value);
  }

  return (
    <RadioGroup
      aria-label="Cor da marca"
      value={selectedBrand}
      onValueChange={chooseBrand}
      className="flex-row flex-wrap gap-2"
    >
      {BRAND_PRESETS.map((preset) => (
        <label
          key={preset.value}
          className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-transparent bg-card px-4 py-2 text-sm font-semibold has-data-checked:border-primary"
        >
          <RadioGroupItem value={preset.value} />
          <span className="size-4 rounded-full" style={{ backgroundColor: preset.value }} />
          {preset.name}
        </label>
      ))}
    </RadioGroup>
  );
}
