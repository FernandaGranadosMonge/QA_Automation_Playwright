import { Locator, Page } from "playwright";

export class LoginPage{
    page: Page;
    usernameTextBox: Locator;
    passwordTextBox: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTextBox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextBox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }
}
