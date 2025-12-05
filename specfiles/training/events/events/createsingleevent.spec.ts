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

  test("Verify Training/Events heading, all tabs and Save button are visible", async ({
    page,
  }) => {
    const createEventPage = new CreateSingleEventPage(page);

    await createEventPage.verifyTrainingEventsHeading();
    await createEventPage.verifyAllTabsAreVisible();
    await expect(createEventPage.saveButton).toBeVisible();
  });

  test.only("Complete Single Event Creation Flow", async ({
    page,
    browser,
  }) => {
    const createEventPage = new CreateSingleEventPage(page);

    const data: SingleEventData = (singleEventData as any).defaultEvent;

    await createEventPage.fillBasicInformation(data);
    await createEventPage.fillNotificationEmails(data);
    await createEventPage.fillEventDetails(data);
    await createEventPage.verifyPromoImage();
    await createEventPage.configureAccessAndContentAreas();
    await createEventPage.fillAttendeeCapacity(data);
    await createEventPage.clickSave();
    // Verify confirmation page
    await createEventPage.validateTabTitle(
      "Training Event Confirmation - Coalition Manager"
    );
    await createEventPage.verifyTrainingEventConfirmationPage();
    // Extract and store event name
    const createdEventName = await createEventPage.getCreatedEventName();
    console.log("Created Event Name:", createdEventName);
    // Navigate to Current Events
    await createEventPage.goToCurrentEvents();
    //  Type the name into Title filter and press Enter
    await createEventPage.filterEventsByTitle(createdEventName);
    //  Verify event is visible in the grid
    await createEventPage.verifyEventVisibleInGrid(createdEventName);
    //Click on copy link button
    await createEventPage.clickCopyLinkForEvent(createdEventName);
    // Validate the URL in the button value
    const copiedUrl = await createEventPage.getCopiedEventUrl(createdEventName);
    console.log("Copied Event URL:", copiedUrl);
    expect(copiedUrl).not.toBeNull();
    expect(copiedUrl).toContain("/trainingevent/details/");

    //  open copied event url in incognito mode and register to the event
    const incognitoContext = await browser.newContext({
      storageState: undefined,
    });

    const incognitoPage = await incognitoContext.newPage();
    await incognitoPage.goto(copiedUrl!);

    await expect(incognitoPage).toHaveURL(/trainingevent\/details/);
    await expect(
      incognitoPage.getByRole("heading", { name: createdEventName })
    ).toBeVisible();
    
    // await incognitoContext.close();
  });
});
