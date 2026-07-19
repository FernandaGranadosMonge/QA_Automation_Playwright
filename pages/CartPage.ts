import { Locator, Page } from "playwright";

export class CartPage {
    page: Page;
    checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async checkout() {
        this.checkoutButton.click();
    }

    async productIsInCart(productName: string): Promise<boolean> {
        const productLocator = this.page.locator('.cart_item')
            .filter({
                has: this.page.locator('.inventory_item_name', { hasText: productName }),
            });
            return await productLocator.count() == 1;
    }
}