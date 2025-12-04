import { test } from "@playwright/test";
import { NewEventPage } from "../../../../pages/trainnings/events/newevent.page";

test.use({
  baseURL: "https://staging2.coalitionmanager.org/staging-combined",
  storageState: "storage/admin.json",
});

test.describe("New Event - Type of Event UI validation and Create new single event.", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const newEvent = new NewEventPage(page);
    // baseURL is set in playwright.config.ts, user is already logged in via storageState
    await newEvent.navigate(testInfo.project.use.baseURL!);
  });

  test("Open New Event and validate Type of Event page and tab name", async ({
    page,
  }) => {
    const newEvent = new NewEventPage(page);
    await newEvent.openNewEventFromSidebar();
    await newEvent.verifyTypeOfEventPage();
    await newEvent.clickHelpIcon();
    await newEvent.validateTabTitle("What Type of Event? - Coalition Manager");

  });

  test("Navigate to Single Event and validate tab name", async ({ page }) => {
    const newEvent = new NewEventPage(page);
    await newEvent.openNewEventFromSidebar();
    await newEvent.verifyTypeOfEventPage();
    await newEvent.clickSingleEvent();
    await newEvent.validateTabTitle("Create New Training Event - Coalition Manager");
  });
});
