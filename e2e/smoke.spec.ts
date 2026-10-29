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
  await expect(page.getByRole('heading', { name: 'Indicadores' })).toBeVisible();
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

test('the forms page links labels to fields and toggles the checkbox', async ({ page }) => {
  await page.goto('forms/');

  await expect(page.getByLabel('Telefone')).toBeVisible();
  await expect(page.getByText('CPF inválido: confira os 11 dígitos.')).toBeVisible();
  const reminder = page.getByRole('checkbox', { name: 'Lembrete por SMS' });
  await reminder.click();
  await expect(reminder).toBeChecked();
});

test('the interface page opens the modal and shows a toast', async ({ page }) => {
  await page.goto('ui/');

  await page.getByRole('button', { name: 'Excluir paciente' }).click();
  const dialog = page.getByRole('dialog', { name: 'Excluir paciente?' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Cancelar' }).click();
  await expect(dialog).toBeHidden();

  await page.getByRole('button', { name: 'Aviso de sucesso' }).click();
  await expect(page.getByText('Paciente salvo.')).toBeVisible();
});

test('the patients list selects rows and moves between pages', async ({ page, isMobile }) => {
  await page.goto('patients/');

  await expect(page.getByText('Ana Carolina Silva Santos')).toBeVisible();
  if (isMobile) {
    // No celular o cabeçalho some, com o "selecionar todas": cada linha vira um cartão com a caixa dela.
    await expect(page.getByRole('columnheader', { name: 'CPF' })).toBeHidden();
    await page.getByRole('checkbox', { name: 'Selecionar Ana Carolina Silva Santos' }).click();
    await expect(page.getByText('1 selecionado')).toBeVisible();
  } else {
    await page.getByRole('checkbox', { name: 'Selecionar todas as linhas' }).click();
    await expect(page.getByText('8 selecionados')).toBeVisible();
  }

  await page.getByRole('link', { name: 'Página 2' }).click();
  await expect(page.getByText('João Pedro Carvalho')).toBeVisible();
  await expect(page.getByText('Página 2 de 2')).toBeVisible();
});

test('the states page shows the empty and error states', async ({ page }) => {
  await page.goto('states/');

  await expect(page.getByText('Nenhum paciente ainda')).toBeVisible();
  await expect(
    page.getByRole('alert').filter({ hasText: 'Não foi possível carregar esta tela' }),
  ).toContainText('2817461093');
});

test('the login page shows the guest card and leads to the dashboard', async ({ page }) => {
  await page.goto('login/');

  await expect(page.getByRole('heading', { level: 1, name: 'Entrar' })).toBeVisible();
  await expect(page.getByLabel('Senha')).toBeVisible();
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Resumo Geral' })).toBeVisible();
});

test('an unknown address shows the not-found page', async ({ page }) => {
  const response = await page.goto('nao-existe/');

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Página não encontrada' }),
  ).toBeVisible();
});
