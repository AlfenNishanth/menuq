import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('archanakgowda28@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('aA@14389');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Manage Menu' }).click();
  await page.locator('div').filter({ hasText: /^₹8Edit$/ }).getByRole('button').click();
  await page.getByPlaceholder('Base Price').click();
  await page.getByPlaceholder('Base Price').fill('78');
  await page.locator('div').filter({ hasText: /^Add Variant$/ }).getByRole('button').first().click();
  await page.getByRole('textbox', { name: 'Add tag' }).click();
  await page.getByRole('textbox', { name: 'Add tag' }).fill('sos');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('button', { name: 'Update Menu Item' }).click();
  await page.locator('div').filter({ hasText: /^Sdfsdftgdrygghf \( reviews\)₹59EditCurrently Unavailable$/ }).getByRole('button').nth(1).click();
  await page.locator('.flex-grow > button').first().click();
  await page.locator('div').filter({ hasText: /^20 mins$/ }).getByRole('button').click();
  await page.getByPlaceholder('Minutes').click();
  await page.getByPlaceholder('Minutes').fill('25');
  await page.locator('.flex > div:nth-child(2) > .text-green-600').click();
  await page.getByRole('button', { name: 'Show Less' }).click();
});