import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('archanakgowda28@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('aA@14389');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Manage Menu' }).click();
  await page.locator('div').filter({ hasText: /^Sdfsdftgdrygghf \( reviews\)₹59EditAvailable$/ }).getByRole('button').nth(1).click();
  await page.locator('.flex-grow > button').first().click();
  await page.locator('div').filter({ hasText: /^25 mins$/ }).getByRole('button').click();
  await page.getByPlaceholder('Minutes').click();
  await page.getByPlaceholder('Minutes').fill('23');
  await page.locator('.text-green-600').first().click();
  await page.getByRole('button', { name: 'Show Less' }).click();
  await page.locator('div').filter({ hasText: /^Sdfsdftgdrygghf \( reviews\)₹59Edit$/ }).getByRole('button').click();
  await page.locator('select[name="type"]').selectOption('Main Course');
  await page.getByRole('button', { name: 'Update Menu Item' }).click();
});