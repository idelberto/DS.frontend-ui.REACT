'use client';

import { useEffect, useState } from 'react';

// Toda marca precisa de 4,5:1 com o texto branco (docs/TOKENS.md): por isso o verde e o laranja
// são os -700, e não os -600.
export const BRAND_PRESETS = [
  { name: 'Azul do Admin One', value: 'oklch(0.546 0.245 262.881)' },
  { name: 'Roxo do BioStar4Life', value: 'oklch(0.558 0.288 302.321)' },
  { name: 'Verde', value: 'oklch(0.508 0.118 165.612)' },
  { name: 'Laranja', value: 'oklch(0.553 0.195 38.402)' },
] as const;

const DEFAULT_BRAND = BRAND_PRESETS[0].value;

export function BrandPicker() {
  const [selectedBrand, setSelectedBrand] = useState<string>(DEFAULT_BRAND);

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--brand');
    };
  }, []);

  function chooseBrand(value: string) {
    document.documentElement.style.setProperty('--brand', value);
    setSelectedBrand(value);
  }

  return (
    <div role="radiogroup" aria-label="Cor da marca" className="flex flex-wrap gap-2">
      {BRAND_PRESETS.map((preset) => (
        <button
          key={preset.value}
          type="button"
          role="radio"
          aria-checked={preset.value === selectedBrand}
          onClick={() => {
            chooseBrand(preset.value);
          }}
          className="flex items-center gap-2 rounded-full border-2 border-transparent bg-card px-4 py-2 text-sm font-semibold aria-checked:border-primary"
        >
          <span className="size-4 rounded-full" style={{ backgroundColor: preset.value }} />
          {preset.name}
        </button>
      ))}
    </div>
  );
}
