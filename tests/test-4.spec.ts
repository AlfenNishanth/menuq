import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('archanakgowda28@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('aA@14389');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Manage Menu' }).click();
  await page.getByRole('link', { name: 'Add Menu Item' }).click();
  await page.getByRole('link', { name: 'Edit Profile' }).click();
  await page.getByRole('link', { name: 'QR Code' }).click();
  await page.locator('div').filter({ hasText: /^Logout$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByText('Logout').click();
  await page.getByRole('button', { name: 'Yes, Logout' }).click();
});