# QA Automation Challenge w/ Playwright and Typescript

This project makes automated tests for the web page https://www.saucedemo.com/ using Playwright and Typescript.

## How to install and run
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

### Troubleshooting

1. Error: browserType.launch: Executable doesn't exist at `/browser/path`

In some instances, it might be required to install the binaries of the browser you are testing on. To do this, feel free to do the following:

**Chrome**

```bash
npx playwright install chromium
npx playwright test
```

**Firefox**

```bash
npx playwright install firefox
npx playwright test --project=firefox
```

## Additional tests (5 and 3 negative ones)
There are 5 additional tests made besides the ones solicited. 3 of them expect a negative outcome.
1. Log in with a restricted user --> expects to receive an error message.
2. Navigate to the products page without logging in --> expects to be redirected to the log-in page and receive an error message.
3. Checkout without filling out the required form --> expects to receive an error message
4. See a product's details page --> expects to succeed.
5. Add 2 products to the cart and verify the correct total amount --> expects to succeed.

## Automatic screenshots on failed tests
If a test fails, there are a couple ways to look at the screenshots taken of the webpage's state when it failed.
1. In the report generated once the test are run, when clicking on a failed test, the screeshot will be visible under the "Screenshots" tab.
2. In the project files, under the folder test-results, a folder will be generated with the name of the failed test and the browser it was tested in. The screenshot will be inside its respective folder.
3. In the project files, under the folder playwright-report > data, the failed test screenshots will be there with an id as a name.

## Risks or defects
1. It allows the user to go through the whole process of checking out without having a single item in the cart.
2. The cart saves between users, meaning that what standard_user added to their cart shows up in problem_user's cart when they log in. There is no session based cart, but rather a shared one.
3. There is no quantity control, so a user can only buy 1 of each item.
4. Error_user shows to have problems with the API, preventing them from adding or removing products to the cart.
5. When problem_user logs in, all images for the products have changed to one of a dog with a ball.

## What tests to run before pushing to production and why?
Session and redirection tests first. Keeping a user's information safe should be one of the top priorities, so preventing logging in with wrong credentials and preventing someone form accessing different parts of the webpage with no session should be critical, along with allowing for a user with correct credentials to log into their correct account.

Then, I would run general product page tests like adding and removing them to the cart, navigating to their description pages and sorting the products.

After, check the cart functionalities like removing items, verifying that what was added is what is actually in the cart, checking prices and proceeding to checkout.

Also, at checkout, verify the price total is being added correctly to ensure that the correct amount will be charged.

Additionaly, form validation checks, especially in the checkout form are greatly important due to that information being needed for delivery.

Then, make several end to end tests by checking the core process flows.

Finally, make general navigation tests and ensure correct pdf report creation.

I would like to focus first on security tests, then core page functionalities and finally move to less critical but still important checks for a complete coverage of the web app.
