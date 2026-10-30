// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { ChartColumn, Users, Wallet } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { Stat, StatCard, StatGroup } from './stat-group';

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

describe('StatCard', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows one indicator in its own card, with the action outside the list', () => {
    render(
      <StatCard
        label="Vendas"
        value="R$ 48.320"
        icon={Wallet}
        tone="success"
        trend={<span>12%</span>}
        action={<button type="button">Configurar vendas</button>}
      />,
    );

    expect(screen.getByRole('term').textContent).toBe('Vendas');
    expect(screen.getByRole('button', { name: 'Configurar vendas' }).closest('dl')).toBeNull();
    const definitions = screen.getAllByRole('definition', { hidden: true });
    expect(definitions.map((definition) => definition.textContent)).toEqual([
      'R$ 48.320',
      '12%',
      '',
    ]);
  });
});

describe('Stat states', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows the goal as a meter named by the target, with the percentage as its text', () => {
    render(
      <StatCard
        label="Vendas do mês"
        value="R$ 48.320"
        icon={Wallet}
        goal={{ current: 48320, target: 60000, label: 'R$ 60.000' }}
      />,
    );

    const meter = screen.getByRole('meter', { name: 'Meta R$ 60.000' });
    expect(meter.getAttribute('aria-valuetext')).toBe('81% da meta');
    expect(meter.getAttribute('aria-valuenow')).toBe('48320');
  });

  it('fills the meter past the goal and keeps the real percentage in the text', () => {
    render(
      <StatCard
        label="Vendas do mês"
        value="R$ 66.000"
        icon={Wallet}
        goal={{ current: 66000, target: 60000, label: 'R$ 60.000' }}
      />,
    );

    const meter = screen.getByRole('meter', { name: 'Meta R$ 60.000' });
    expect(meter.getAttribute('aria-valuetext')).toBe('110% da meta');
    expect(meter.getAttribute('aria-valuenow')).toBe('60000');
  });

  it('keeps the name for screen readers while loading and hides the skeleton', () => {
    render(<StatCard label="Vendas" value={null} icon={Wallet} loading />);

    expect(screen.getByRole('term').textContent).toBe('Vendas');
    expect(screen.getByText('Carregando…')).toBeDefined();
    expect(screen.queryByText('Sem dados no período')).toBeNull();
  });

  it('shows a dash without data, read as "Sem dados no período", and drops the trend and the goal', () => {
    render(
      <StatGroup title="Indicadores">
        <Stat
          label="Clientes novos"
          value={null}
          icon={Users}
          trend={<span>8%</span>}
          goal={{ current: 0, target: 100, label: '100' }}
        />
      </StatGroup>,
    );

    const definitions = screen.getAllByRole('definition', { hidden: true });
    expect(definitions.map((definition) => definition.textContent)).toEqual([
      '—',
      'Sem dados no período',
      '',
    ]);
    expect(definitions[0]?.getAttribute('aria-hidden')).toBe('true');
    expect(screen.queryByRole('meter')).toBeNull();
  });
});
