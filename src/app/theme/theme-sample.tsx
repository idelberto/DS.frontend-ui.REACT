export function ThemeSample() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-background p-6 text-foreground">
      <div className="flex flex-col gap-4 rounded-2xl bg-card p-6 text-card-foreground">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl">Card</h3>
          <span className="rounded-full bg-brand-muted px-3 py-1 text-xs font-semibold text-brand-muted-foreground">
            Selo
          </span>
        </div>
        <p className="text-muted-foreground">Texto secundário sobre o card.</p>
        <input
          aria-label="Campo de exemplo"
          placeholder="Campo"
          className="h-12 w-full min-w-0 rounded-sm border border-input bg-card px-3 placeholder:text-muted-foreground"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full bg-primary px-6 py-2 font-semibold text-primary-foreground"
          >
            Primário
          </button>
          <button type="button" className="rounded-full bg-secondary px-6 py-2 font-semibold">
            Secundário
          </button>
          <button
            type="button"
            className="rounded-full border border-destructive px-6 py-2 font-semibold text-destructive-muted-foreground"
          >
            Excluir
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 rounded-2xl bg-sidebar p-3 text-sm text-sidebar-foreground">
        <span className="rounded-lg bg-brand-muted px-4 py-2.5 font-medium text-brand-muted-foreground">
          Item ativo do menu
        </span>
        <span className="rounded-lg px-4 py-2.5 font-medium hover:bg-sidebar-accent">
          Item do menu
        </span>
      </div>
    </div>
  );
}
