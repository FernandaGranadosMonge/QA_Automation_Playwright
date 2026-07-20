import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPageOne } from '../pages/CheckoutPageOne';
import { CheckoutPageTwo } from '../pages/CheckoutPageTwo';

// Before all tests, log in with standard credentials
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // Fill out username and password.
    await loginPage.login('standard_user', 'secret_sauce');
});

test('complete checkout process', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPageOne = new CheckoutPageOne(page);
    const checkoutPageTwo = new CheckoutPageTwo(page);

    // Add product to cart
    await productsPage.addToCart('Sauce Labs Fleece Jacket');

    // Go to cart page
    await productsPage.goToCart();

    // Go to checkout page
    await cartPage.checkout();

    // Fill out checkout information
    await checkoutPageOne.continueCheckout('Fernanda', 'Granados', '90901');

    // Finish checkout
    await checkoutPageTwo.finishCheckout();

    // Expect to be shown a confirmation message
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
})

test('checkout without checkout information', async ({page}) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPageOne = new CheckoutPageOne(page);

    // Add product to cart
    await productsPage.addToCart('Sauce Labs Bolt T-Shirt');

    // Go to cart page
    await productsPage.goToCart();

    // Go to checkout page
    await cartPage.checkout();

    // Don't fill out checkout information
    await checkoutPageOne.continueCheckout('', '', '');

    await expect(page.getByText('Error: First Name is required')).toBeVisible();
});

test('check item total breakdown', async ({page}) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPageOne = new CheckoutPageOne(page);
    const checkoutPageTwo = new CheckoutPageTwo(page);

    // Add products to cart
    await productsPage.addToCart('Test.allTheThings() T-Shirt (Red)');
    await productsPage.addToCart('Sauce Labs Backpack');

    // Go to cart page
    await productsPage.goToCart();

    // Go to checkout page
    await cartPage.checkout();

    // Fill out checkout information
    await checkoutPageOne.continueCheckout('Fernanda', 'Granados', '90901');

    const displayedTotal = await checkoutPageTwo.getItemTotal();
    const productPrices = await checkoutPageTwo.getProductPrices();
    const expectedTotal = productPrices.reduce((sum, price) => sum + price, 0)

    expect(displayedTotal).toBe(expectedTotal)

});