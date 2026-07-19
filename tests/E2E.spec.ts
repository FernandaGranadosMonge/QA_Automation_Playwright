import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPageOne } from '../pages/CheckoutPageOne';
import { CheckoutPageTwo } from '../pages/CheckoutPageTwo';

test('checkout process', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPageOne = new CheckoutPageOne(page);
    const checkoutPageTwo = new CheckoutPageTwo(page);

    await loginPage.goto();

    // Fill out username and password.
    await loginPage.login('standard_user', 'secret_sauce');

    // Add product to cart
    await productsPage.addToCart('Sauce Labs Fleece Jacket');

    // Go to cart page
    await productsPage.goToCart();

    // Go to checkout page
    await cartPage.checkout();

    // Fill out checkout information
    await checkoutPageOne.continueCheckout('Fernanda', 'Granados', '90901');

    // Finish checkout
    await checkoutPageTwo.finish();

    // Expect to be shown a confirmation message
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
})