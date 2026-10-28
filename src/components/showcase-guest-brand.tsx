import { Gem } from 'lucide-react';

export function ShowcaseGuestBrand() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
        <Gem className="size-7" />
      </span>
      <div>
        <p className="text-xl font-semibold">frontend-ui</p>
        <p className="text-sm text-muted-foreground">Vitrine do design system</p>
      </div>
    </div>
  );
}
