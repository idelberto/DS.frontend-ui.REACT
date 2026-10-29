// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { BRAND_PRESETS, BrandPicker } from './brand-picker';

const PURPLE = BRAND_PRESETS[1];

describe('BrandPicker', () => {
  afterEach(() => {
    cleanup();
  });

  it('sets the chosen brand on the page and marks it as checked', async () => {
    render(<BrandPicker />);

    await userEvent.click(screen.getByRole('radio', { name: PURPLE.name }));

    expect(document.documentElement.style.getPropertyValue('--brand')).toBe(PURPLE.value);
    expect(screen.getByRole('radio', { name: PURPLE.name })).toHaveProperty('ariaChecked', 'true');
  });

  it('moves to the next brand with the arrow key', async () => {
    render(<BrandPicker />);
    await userEvent.click(screen.getByRole('radio', { name: BRAND_PRESETS[0].name }));

    await userEvent.keyboard('{ArrowRight}');

    expect(document.documentElement.style.getPropertyValue('--brand')).toBe(PURPLE.value);
  });

  it('restores the theme brand when the page leaves', async () => {
    const { unmount } = render(<BrandPicker />);
    await userEvent.click(screen.getByRole('radio', { name: PURPLE.name }));

    unmount();

    expect(document.documentElement.style.getPropertyValue('--brand')).toBe('');
  });
});
