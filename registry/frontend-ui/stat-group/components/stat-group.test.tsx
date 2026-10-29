// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { ChartColumn, Users } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { Stat, StatGroup } from './stat-group';

describe('StatGroup', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows the indicators in one card, under the group header and its action', () => {
    render(
      <StatGroup
        title="Indicadores"
        icon={ChartColumn}
        action={<button type="button">Configurar indicadores</button>}
      >
        <Stat label="Pacientes" value="512" icon={Users} tone="success" trend={<span>12%</span>} />
        <Stat label="Atendimentos" value="38" icon={Users} />
      </StatGroup>,
    );

    expect(screen.getByRole('heading', { name: 'Indicadores' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Configurar indicadores' })).toBeDefined();
    expect(screen.getAllByRole('term').map((term) => term.textContent)).toEqual([
      'Pacientes',
      'Atendimentos',
    ]);
  });

  it('pairs each name with its value and trend, and hides the icon from screen readers', () => {
    render(
      <StatGroup title="Indicadores">
        <Stat label="Pacientes" value="512" icon={Users} trend={<span>12%</span>} />
      </StatGroup>,
    );

    const definitions = screen.getAllByRole('definition', { hidden: true });
    expect(definitions.map((definition) => definition.textContent)).toEqual(['512', '12%', '']);
    expect(definitions[2]?.getAttribute('aria-hidden')).toBe('true');
  });
});
