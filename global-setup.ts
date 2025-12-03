import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "./pages/login/loginPage";
import adminData from "./fixtures/common/adminlogindata.json";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const login = new LoginPage(page);

  // baseURL from playwright.config.ts
  const baseURL = config.projects[0].use.baseURL!;
  await login.navigate(baseURL);

  // valid credentials
  const user = adminData.validUser;
  await login.login(user.username, user.password);

  // Save loggedin session state
  await page.context().storageState({ path: "storage/admin.json" });

  await browser.close();
}

export default globalSetup;
