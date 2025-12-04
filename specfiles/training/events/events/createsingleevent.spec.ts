import { test, expect } from "@playwright/test";
import { NewEventPage } from "../../../../pages/trainnings/events/newevent.page";
import {
  CreateSingleEventPage,
  SingleEventData,
} from "../../../../pages/trainnings/events/events/createsingleevent.page";
import singleEventData from "../../../../fixtures/common/createsingleeventdata.json";

test.use({
  baseURL: "https://staging2.coalitionmanager.org/staging-combined",
  storageState: "storage/admin.json",
});

test.describe("Create Single Event - Training/Events - Full End-to-End Flow", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const newEventPage = new NewEventPage(page);

    // Navigate to dashboard (already logged-in via storageState)
    await newEventPage.navigate(testInfo.project.use.baseURL!);

    // Open Trainings/Events → New Event → Single Event
    await newEventPage.openNewEventFromSidebar();
    await newEventPage.clickSingleEvent();
  });

  test.only("Verify Training/Events heading, all tabs and Save button are visible", async ({
    page,
  }) => {
    const createEventPage = new CreateSingleEventPage(page);

    await createEventPage.verifyTrainingEventsHeading();
    await createEventPage.verifyAllTabsAreVisible();
    await expect(createEventPage.saveButton).toBeVisible();
  });

  test.only("Complete Single Event Creation Flow", async ({ page }) => {
    const createEventPage = new CreateSingleEventPage(page);

    const data: SingleEventData = (singleEventData as any).defaultEvent;

    await createEventPage.fillBasicInformation(data);
    await createEventPage.fillNotificationEmails(data);
    await createEventPage.fillEventDetails(data);
    await createEventPage.verifyPromoImage();
    await createEventPage.configureAccessAndContentAreas();
    await createEventPage.clickSave();

  });
});
