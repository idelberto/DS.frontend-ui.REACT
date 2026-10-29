interface FooterBarProps {
  name: string;
  version?: string;
}

export function FooterBar({ name, version }: FooterBarProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center px-6 py-4">
      {/* No claro, o branco do card: sobre o gray-100 do Vue, o texto fica abaixo do AA (4,4:1).
          No escuro, o slate-700/50 do Vue. */}
      <p className="flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-xs text-muted-foreground dark:bg-muted/50">
        <span className="font-medium">{name}</span>
        <span aria-hidden="true">·</span>
        <span>© {year}</span>
        {version !== undefined && (
          <>
            <span aria-hidden="true">·</span>
            <span className="rounded-full bg-brand-muted px-1.5 py-0.5 font-medium text-brand-muted-foreground">
              {version}
            </span>
          </>
        )}
      </p>
    </footer>
  );
}
