import { BasePage } from "../basePage";
import { Locator, Page, expect } from "@playwright/test";

export class LoginPage extends BasePage {
  readonly logo: Locator;
  readonly headingTitle: Locator;
  readonly subTitle: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginButton: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly clickHereLink: Locator;
  readonly togglePasswordIcon: Locator;
  readonly dashboardNav: Locator;
  readonly dashboardNavText: Locator;

  constructor(page: Page) {
    super(page);

    this.logo = page.locator("#bodyContent").getByRole("img");
    this.headingTitle = page.getByRole("heading", {
      name: "Welcome to Coalition Manager",
    });
    this.subTitle = page.getByText("Login to your account");
    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.rememberMeCheckbox = page.getByRole("checkbox", {
      name: "Remember me",
    });
    this.forgotPasswordLink = page.getByRole("link", {
      name: "Forgot Password?",
    });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.emailError = page.locator('span[data-valmsg-for="Email"]');
    this.passwordError = page.locator('span[data-valmsg-for="Password"]');
    this.clickHereLink = page.getByRole("link", { name: "Click here" });
    this.togglePasswordIcon = page.locator(".toggle-password").first();
    this.dashboardNav = page.getByRole("link", { name: "Dashboard" });
    this.dashboardNavText = page.locator("#dashboardNav");
  }

  async login(email: string, password: string) {
    await this.type(this.emailField, email);
    await this.type(this.passwordField, password);
    await this.click(this.loginButton);
  }

  async clearAndClickLogin() {
    await this.click(this.emailField);
    await this.emailField.clear();
    await this.click(this.passwordField);
    await this.passwordField.clear();
    await this.click(this.loginButton);
  }

  async toggleRememberMe() {
    await this.click(this.rememberMeCheckbox);
  }

  async goToForgotPasswordPage() {
    await this.click(this.forgotPasswordLink);
  }

  async goToRegisterPage() {
    await this.click(this.clickHereLink);
  }

  async validateLoginPageElements() {
    await expect(this.logo).toBeVisible();
    await expect(this.headingTitle).toContainText(
      "Welcome to Coalition Manager"
    );
    await expect(this.subTitle).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.rememberMeCheckbox).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async validateRequiredErrors() {
    await expect(this.emailError).toHaveText("The Email field is required.");
    await expect(this.passwordError).toHaveText(
      "The Password field is required."
    );
  }

  async validateInvalidEmailError() {
    await expect(this.emailError).toHaveText(
      "The Email field is not a valid e-mail address."
    );
  }

  async togglePasswordHideIcon() {
    await expect(this.togglePasswordIcon).toBeVisible();
    await expect(this.togglePasswordIcon).toHaveClass(/fa-eye/);
  }

  async togglePasswordShowIcon() {
    await expect(this.togglePasswordIcon).toBeVisible();
    await expect(this.togglePasswordIcon).toHaveClass(/fa-eye-slash/);
  }

  async clickTogglePassword() {
    await expect(this.togglePasswordIcon).toBeVisible();
    await this.togglePasswordIcon.click();
  }

}
