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
