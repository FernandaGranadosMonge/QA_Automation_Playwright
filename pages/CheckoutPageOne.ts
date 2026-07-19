import { Locator, Page } from "playwright";

export class CheckoutPageOne {
    page: Page;
    firstNameTextBox: Locator;
    lastNameTextBox: Locator;
    zipCodeTextBox: Locator;
    continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameTextBox = page.getByRole('textbox', { name: 'Last Name' });
        this.zipCodeTextBox = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async continueCheckout(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameTextBox.fill(firstName)
        await this.lastNameTextBox.fill(lastName)
        await this.zipCodeTextBox.fill(zipCode)
        await this.continueButton.click()
    }
}