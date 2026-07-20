import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

// Before all tests, log in with standard credentials
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // Fill out username and password.
    await loginPage.login('standard_user', 'secret_sauce');
});

test('add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add product to cart
    await productsPage.addToCart('Sauce Labs Backpack');

    // Expect the cart badge to show 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('add multiple products to cart', async ({page}) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add multiple products to cart
    await productsPage.addToCart('Sauce Labs Backpack');
    await productsPage.addToCart('Sauce Labs Bike Light');

    // Expect the cart badge to show 2
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Remove an item from the cart
    await productsPage.removeFromCart('Sauce Labs Backpack');

    // Expect the cart badge to show 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Go to cart page
    await productsPage.goToCart();

    // Expect the product to be in the cart
    expect(await cartPage.productIsInCart('Sauce Labs Bike Light')).toBeTruthy();
});

test('go to product details page', async ({ page}) => {
    const productsPage = new ProductsPage(page);

    // Go to product details page
    await productsPage.goToProductDetails('Sauce Labs Onesie');

    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Onesie');
});