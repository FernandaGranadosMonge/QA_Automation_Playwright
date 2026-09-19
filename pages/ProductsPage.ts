import { Locator, Page } from "playwright";

export class ProductsPage{
    page: Page;
    cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = this.page.locator('.shopping_cart_container').getByRole('button');
    }

    async addToCart(productName: string) {
        await this.page
        .locator('.inventory_item')      // Get elements with css class inventory_item
        .filter({
            // Get element with css class inventory_item_name that match the name of the product
            has: this.page.locator('.inventory_item_name', { hasText: productName }),
        })
        .getByRole('button', { name: 'Add to cart' })
        .click();
    }

    async removeFromCart(productName: string) {
        await this.page
        .locator('.inventory_item')      // Get elements with css class inventory_item
        .filter({
            // Get element with css class inventory_item_name that match the name of the product
            has: this.page.locator('.inventory_item_name', { hasText: productName }),
        })
        .getByRole('button', { name: 'Remove' })
        .click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async goToProductDetails(productName: string) {
        await this.page
        .locator('.inventory_item_label')
        .filter({
            has: this.page.locator('.inventory_item_name', { hasText: productName }),
        })
        .getByRole('button')
        .click();
    }
}