// Gera o public/tokens.css a partir do item theme do registry.json: a mesma fonte de verdade para
// o projeto com shadcn (que instala o item) e para o projeto sem ele (que importa o CSS).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface ThemeItem {
  name: string;
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

const ROOT_DIR = join(import.meta.dirname, '..');
const OUTPUT_PATH = join(ROOT_DIR, 'public', 'tokens.css');

function declarations(variables: Record<string, string>): string {
  return Object.entries(variables)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join('\n');
}

const registry = JSON.parse(readFileSync(join(ROOT_DIR, 'registry.json'), 'utf8')) as {
  items: ThemeItem[];
};
const theme = registry.items.find((item) => item.name === 'theme');
if (theme === undefined) {
  throw new Error('O registry.json não tem o item theme.');
}

const css = `/* Gerado por scripts/build-tokens.ts a partir do item theme do registry.json: não edite. */
:root {
${declarations(theme.cssVars.light)}
}

.dark {
${declarations(theme.cssVars.dark)}
}
`;

writeFileSync(OUTPUT_PATH, css);
