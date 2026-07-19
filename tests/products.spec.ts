import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('add product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();

    // Fill out username and password.
    await loginPage.login('standard_user', 'secret_sauce');

    // Add product to cart
    await productsPage.addToCart('Sauce Labs Backpack');

    // Expect the cart badge to show 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('add multiple products to cart', async ({page}) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();

    // Fill out username and password.
    await loginPage.login('standard_user', 'secret_sauce');

    // Add multiple products to cart
    await productsPage.addToCart('Sauce Labs Backpack');
    await productsPage.addToCart('Sauce Labs Bike Light');

    // Expect the cart badge to show 2
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await productsPage.removeFromCart('Sauce Labs Backpack');

    // Expect the cart badge to show 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await productsPage.goToCart();

    // Expect the product to be in the cart
    await expect(await cartPage.productIsInCart('Sauce Labs Bike Light')).toBeTruthy();

});

