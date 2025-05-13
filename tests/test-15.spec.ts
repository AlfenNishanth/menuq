import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('archanakgowda28@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('aA@14389');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Manage Menu' }).click();
  await page.locator('div').filter({ hasText: /^₹100Edit$/ }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Item Name' }).click();
  await page.getByRole('textbox', { name: 'Item Name' }).fill('wafer');
  await page.getByRole('button', { name: 'Update Menu Item' }).click();
});