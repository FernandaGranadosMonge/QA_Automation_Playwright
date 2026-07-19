import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  // Fill out username and password.
  await loginPage.login('standard_user', 'secret_sauce');

  // Expect the page to have a title with the name of Products.
  await expect(page.getByText('Products')).toBeVisible();

});

test('wrong credentials login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  // Fill out incorrect username and password.
  await loginPage.login('incorrect_user', 'incorrect_password');

  // Expect the page to show an error message.
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});
