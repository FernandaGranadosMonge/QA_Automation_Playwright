# QA Automation Challenge
## with Playwright and Typescript

This project makes automated tests for the web page https://www.saucedemo.com/ using Playwright and Typescript.

### How to install and run
1. Open VSCode (or your preferred IDE)
2. Inside your selected folder, run the following command in the terminal to download the project:
```
git clone https://github.com/FernandaGranadosMonge/QA_Automation_Playwright.git
```
3. Downloading the project will create a folder with the name QA_Automation_Playwright. Change your directory to the new folder:
```
cd .\QA_Automation_Playwright
```
4. Install dependencies with:
```
npm ci
```
5. Run the tests in Chrome, Firefox and Webkit with the command:
```
npx playwright test 
```
6. Generate an html report with the test results by running:
```
npx playwright show-report
```
7. Type CTRL + C in the terminal to quit the report.

### Additional tests (5 and 3 negative ones)

### Risks or defects
1. It allows the user to go through the whole process of checking out without having a single item in the cart.
2. The cart saves between users, meaning that what standard_user added to their cart shows up in problem_user's cart when they log in. There is no session based cart, but rather a shared one.
3. There is no quantity control, so a user can only buy 1 of each item.
4. Error_user shows to have problems with the API, preventing them from adding or removing products to the cart.
5. When problem_user logs in, all images for the products have changed to one of a dog with a ball.

### What tests to run before pushing to production and why?
Session and redirection tests first. Keeping a user's information safe should be one of the top priorities, so preventing logging in with wrong credentials and preventing someone form accessing different parts of the webpage with no session should be critical, along with allowing for a user with correct credentials to log into their correct account.

Then, I would run general product page tests like adding and removing them to the cart, navigating to their description pages and sorting the products.

After, check the cart functionalities like removing items, verifying that what was added is what is actually in the cart, checking prices and proceeding to checkout.

Also, at checkout, verify the price total is being added correctly to ensure that the correct amount will be charged.

Additionaly, form validation checks, especially in the checkout form are greatly important due to that information being needed for delivery.

Then, make several end to end tests by checking the core process flows.

Finally, make general navigation tests and ensure correct pdf report creation.

I would like to focus first on security tests, then core page functionalities and finally move to less critical but still important checks for a complete coverage of the web app.
