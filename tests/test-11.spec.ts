import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('archanakgowda28@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('aA@14389');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'QR Code' }).click();
  await page.locator('div').filter({ hasText: /^QR Code ColorSelect Color$/ }).getByRole('button').click();
  await page.locator('.saturation-black').click();
  await page.locator('.fixed').click();
  await page.locator('div').filter({ hasText: /^Border Size \(px\)0510$/ }).getByRole('slider').fill('5');
  await page.getByRole('checkbox', { name: 'Include Preset Logo' }).check();
  await page.locator('.mb-4 > .grid > button:nth-child(2)').first().click();
  await page.locator('div').filter({ hasText: /^Logo SizeSmallMediumLarge$/ }).getByRole('slider').fill('20');
  await page.locator('div').filter({ hasText: /^Logo Background ColorSelect Color$/ }).getByRole('button').click();
  await page.locator('.saturation-black').click();
  await page.locator('.fixed').click();
  await page.getByRole('textbox', { name: 'Enter your restaurant name' }).click();
  await page.getByRole('textbox', { name: 'Enter your restaurant name' }).fill('AKG');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download QR Code' }).click();
  const download = await downloadPromise;
});