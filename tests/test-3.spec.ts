import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('aphorismedgetech.com');
  await page.getByRole('textbox', { name: 'Email Address' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email Address' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email Address' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email Address' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('aphorismedgetech@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('aA@14389');
  await page.locator('form').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Manage Menu' }).click();
  await page.locator('div').filter({ hasText: /^Dosa \( reviews\)₹300EditgoodniceAvailable$/ }).getByRole('button').nth(1).click();
  await page.locator('div').filter({ hasText: 'Logout' }).nth(4).click();
  await page.getByRole('button', { name: 'Log out' }).click();
});