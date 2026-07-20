import { Locator, Page } from "playwright";

export class CheckoutPageTwo {
    page: Page;
    finishButton: Locator;

    constructor(page: Page){
        this.page = page
        this.finishButton = this.page.getByRole("button", {name: "Finish"})
    }

    async finishCheckout(){
        await this.finishButton.click();
    }

    async getProductPrices(): Promise<number[]> {
        const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();

        return priceTexts.map(priceText => Number(priceText.replace('$', '')));
    }

    async getItemTotal(): Promise<number> {
        const itemTotal = await this.page.locator('.summary_subtotal_label').allTextContents();

        return Number(itemTotal[0].replace('Item total: $', ''));

    }
}