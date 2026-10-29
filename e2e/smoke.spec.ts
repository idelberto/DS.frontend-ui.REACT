import { expect, test } from '@playwright/test';

test('the showcase lists the registry items', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('heading', { level: 1, name: 'frontend-ui' })).toBeVisible();
  await expect(page.getByText('@frontend-ui/hello-world')).toBeVisible();
  await expect(page.getByText('Instalado pelo registry @frontend-ui.')).toBeVisible();
});

test('the registry serves the item JSON', async ({ request }) => {
  const response = await request.get('r/hello-world.json');

  expect(response.status()).toBe(200);
  const item = (await response.json()) as { name: string };
  expect(item.name).toBe('hello-world');
});
