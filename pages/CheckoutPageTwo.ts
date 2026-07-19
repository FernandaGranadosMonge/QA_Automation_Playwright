import { Locator, Page } from "playwright";

export class CheckoutPageTwo {
    page: Page;
    finishButton: Locator;

    constructor(page: Page){
        this.page = page
        this.finishButton = this.page.getByRole("button", {name: "Finish"})
    }

    async finish(){
        await this.finishButton.click();
    }
}