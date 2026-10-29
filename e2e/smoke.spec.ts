import { expect, test } from '@playwright/test';

test('the showcase lists the registry items', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('heading', { level: 1, name: 'frontend-ui' })).toBeVisible();
  await expect(page.getByText('@frontend-ui/theme')).toBeVisible();
});

test('the registry serves the item JSON and the tokens.css', async ({ request }) => {
  const item = await request.get('r/theme.json');
  expect(item.status()).toBe(200);
  expect(((await item.json()) as { name: string }).name).toBe('theme');

  const tokens = await request.get('tokens.css');
  expect(tokens.status()).toBe(200);
  expect(await tokens.text()).toContain('--brand:');
});

test('the theme page switches the brand color', async ({ page }) => {
  await page.goto('theme/');
  const primaryButton = page.getByRole('button', { name: 'Primário' }).first();
  const initialColor = await primaryButton.evaluate(
    (button) => getComputedStyle(button).backgroundColor,
  );

  await page.getByRole('radio', { name: 'Roxo do BioStar4Life' }).click();

  await expect(primaryButton).not.toHaveCSS('background-color', initialColor);
});

test('the dashboard marks its menu item and shows the coming-soon items', async ({
  page,
  isMobile,
}) => {
  await page.goto('dashboard/');

  await expect(page.getByRole('heading', { level: 1, name: 'Resumo Geral' })).toBeVisible();
  await expect(page.getByText('Compromissos de Hoje')).toBeVisible();
  await expect(page.getByText(/© \d{4}/)).toBeVisible();

  if (isMobile) {
    await page.getByRole('button', { name: 'Abrir ou fechar o menu' }).first().click();
  }
  const menu = page.getByRole('navigation', { name: 'Menu principal' });
  await expect(menu.getByRole('link', { name: 'Painel' })).toHaveAttribute('aria-current', 'page');
  await expect(menu.getByText('Em breve').first()).toBeVisible();
});

test('the desktop menu collapses to icons', async ({ page, isMobile }) => {
  test.skip(isMobile, 'No celular o menu abre por cima da página.');
  await page.goto('dashboard/');
  const sidebar = page.locator('[data-slot="sidebar"][data-state]');
  await expect(sidebar).toHaveAttribute('data-state', 'expanded');

  await page.getByRole('button', { name: 'Abrir ou fechar o menu' }).first().click();

  await expect(sidebar).toHaveAttribute('data-state', 'collapsed');
  await expect(page.getByText('Vitrine do design system')).toBeHidden();
});
