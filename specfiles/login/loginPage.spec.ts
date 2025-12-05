import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginPage";
import credentials from "../../fixtures/common/adminlogindata.json";

test.use({ storageState: undefined });

test.describe("Login Page : Coalition Manager", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const login = new LoginPage(page);
    await login.navigate(testInfo.project.use.baseURL!);
  });

  test("Verify the visibility of UI elements on login page", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.validateLoginPageElements();
  });

  test("Try logging in with empty fields and validating the display of validation messages for email and password fields. ", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.clearAndClickLogin();
    await login.validateRequiredErrors();
  });

  test("Verfiy by logging in with invalid username & password", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const user = credentials.invalidUser;
    await login.login(user.username, user.password,false);
    await expect(page.getByText("Invalid login attempt")).toBeVisible();
  });

  test("Verfiy by logging in with invalid email in username .", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const user = credentials.invalidEmailUsername;
    await login.login(user.username, user.password,false);
    await login.validateInvalidEmailError();
  });

  test("Verify password show/hide icon works correctly", async ({ page }) => {
    const login = new LoginPage(page);
    await login.passwordField.fill("TestPassword123");
    await login.togglePasswordHideIcon();

    await login.clickTogglePassword();
    await login.togglePasswordShowIcon();

    await login.clickTogglePassword();
    await login.togglePasswordHideIcon();
  });

  test("Verify by checking and unchecking remember me checkbox toggle", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.toggleRememberMe();
    await expect(login.rememberMeCheckbox).toBeChecked();
    await login.toggleRememberMe();
    await expect(login.rememberMeCheckbox).not.toBeChecked();
  });

  test("Verify the Forgot Password flow by ensuring the reset link opens the proper page.", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    await login.goToForgotPasswordPage();
    await expect(page).toHaveURL(/ForgotPassword/);
  });

  test("Verify the Registration link redirects correctly", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToRegisterPage();
    await expect(page).toHaveURL(
      "https://staging2.coalitionmanager.org/staging-combined/contactmanager/contact/publicregistration"
    );
  });

  test("Verify successful login with correct credentials", async ({ page }) => {
    const login = new LoginPage(page);
    const user = credentials.validUser;
    await login.login(user.username, user.password);
  });

  test("Validate browser tab title after login", async ({ page }) => {
    const login = new LoginPage(page);
    const user = credentials.validUser;
    await login.login(user.username, user.password);
    await login.validateTabTitle("Home Page - Coalition Manager");
  });
});
