import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('archanak123@gmail.com');
  await page.getByRole('textbox', { name: 'Phone Number' }).click();
  await page.getByRole('textbox', { name: 'Phone Number' }).fill('9916880339');
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('aA1234');
  await page.getByRole('textbox', { name: 'Confirm Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('aA1234');
  await page.getByRole('textbox', { name: 'Restaurant Name' }).click();
  await page.getByRole('textbox', { name: 'Restaurant Name' }).fill('AKG');
  await page.getByRole('textbox', { name: 'Restaurant Address' }).click();
  await page.getByRole('textbox', { name: 'Restaurant Address' }).fill('Banglore');
  await page.getByRole('spinbutton', { name: 'Number of Seats' }).click();
  await page.getByRole('spinbutton', { name: 'Number of Seats' }).fill('48');
  await page.getByLabel('Restaurant Category').selectOption('Casual Dining');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.goto('http://localhost:5173/login');
});