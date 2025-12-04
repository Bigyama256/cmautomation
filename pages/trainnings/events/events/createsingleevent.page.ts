import { BasePage } from "../../../basePage";
import { CommonFunctions } from "../../../../functions/commonfunctions";
import { Locator, Page, expect } from "@playwright/test";

export type SingleEventData = {
  eventTitle: string;
  hours: string;
  executiveSummary: string;
  description: string;
  notes: string;
  brochureUrl: string;
  fileLocation: string;
  tag: string;
  accommodationsNotificationEmail: string;
  eventRegistrationNotificationEmail: string;
  eventRegistrationCancellationNotificationEmail: string;
  surveyNotificationEmail: string;
  eventWaitlistEmail: string;
  surveyLinkFromCustomForms: string;
  venue: string;
  startDate: string;
  endDate: string;
};

export class CreateSingleEventPage extends BasePage {
  generatedEventTitle?: string;
  // ---------- Navigation / Header ----------
  readonly trainingsEventsMenu: Locator;
  readonly newEventLink: Locator;
  readonly singleEventLink: Locator;
  readonly trainingEventsHeading: Locator;

  // ---------- Tabs ----------
  readonly basicInformationTab: Locator;
  readonly promoImageTab: Locator;
  readonly trainersTab: Locator;
  readonly trainingAccessTab: Locator;
  readonly contentAreasTab: Locator;
  readonly publicationInformationTab: Locator;
  readonly occupationCountTab: Locator;

  // ---------- Basic Information ----------
  readonly eventTitleInput: Locator;
  readonly hoursInput: Locator;
  readonly executiveSummaryInput: Locator;
  readonly brochureUrlInput: Locator;
  readonly fileLocationInput: Locator;
  readonly tagInput: Locator;
  readonly hasRegistrationCheckbox: Locator;

  // ---------- Registration / Notification Emails ----------
  readonly accommodationsNotificationEmailInput: Locator;
  readonly eventRegistrationNotificationEmailInput: Locator;
  readonly eventRegistrationCancellationNotificationEmailInput: Locator;
  readonly surveyNotificationEmailInput: Locator;
  readonly waitlistNotificationEmailInput: Locator;
  readonly surveyLinkFromCustomFormsInput: Locator;

  // ---------- Event Details ----------
  readonly venueInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;

  //Venue
  readonly promoImageHeader: Locator;
  readonly promoImageDescription: Locator;
  readonly promoImageSizeText: Locator;
  readonly promoImageFormatText: Locator;
  readonly promoImageUploadButton: Locator;

  // ---------- Access / Content Areas ----------
  readonly trainingAccessHeader: Locator;
  readonly accessLevelWidget: Locator;
  readonly accessLevelDropdownArrow: Locator;
  readonly accessLevelSelectedText: Locator;
  readonly openToAllOption: Locator;

  readonly contentAreasGrid: Locator;
  readonly underservedPopulationsCheckbox: Locator;

  // ---------- Save ----------
  readonly saveButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation / Header
    this.trainingsEventsMenu = page.locator("#trainingNav");
    this.newEventLink = page.getByRole("link", { name: "New Event" });
    this.singleEventLink = page.getByRole("link", { name: "Single Event" });
    this.trainingEventsHeading = page.getByRole("heading", {
      name: "Training/Events",
    });

    // Tabs
    this.basicInformationTab = page
      .locator("a")
      .filter({ hasText: "Basic Information" });
    this.promoImageTab = page.locator("a").filter({ hasText: "Promo Image" });
    this.trainersTab = page.locator("a").filter({ hasText: "Trainers" });
    this.trainingAccessTab = page
      .locator("a")
      .filter({ hasText: "Training Access" });
    this.contentAreasTab = page
      .locator("a")
      .filter({ hasText: "Content Areas" });
    this.publicationInformationTab = page
      .locator("a")
      .filter({ hasText: "Publication Information" });
    this.occupationCountTab = page
      .locator("a")
      .filter({ hasText: "Occupation Count" });

    // Basic Information
    this.eventTitleInput = page.locator("#Title");
    this.hoursInput = page.getByRole("spinbutton", { name: "Hours" });
    this.executiveSummaryInput = page.locator("#ExecutiveSummary");

    this.brochureUrlInput = page.locator("#BrochureUrl");
    this.fileLocationInput = page.locator("#FileLocation");
    this.tagInput = page.locator("#Tag");

    // Registration / Notification Emails
    this.hasRegistrationCheckbox = page.locator("#HasRegistrations");
    this.accommodationsNotificationEmailInput = page.locator(
      "#AccommodationEmail"
    );

    this.eventRegistrationNotificationEmailInput = page.locator(
      "#TrainingEventRegistrationNotificationEmail"
    );

    this.eventRegistrationCancellationNotificationEmailInput = page.locator(
      "#TrainingEventCancellationNotificationEmail"
    );
    this.surveyNotificationEmailInput = page.locator("#EvaluationEmail");

    this.waitlistNotificationEmailInput = page.locator(
      "#TrainingEventWaitlistNotificationEmail"
    );

    this.surveyLinkFromCustomFormsInput = page.locator("#SurveyLink");

    // Event Details
    this.venueInput = page.locator("#EventAddress");
    this.startDateInput = page.locator("#StartDate");
    this.endDateInput = page.locator("#EndDate");

    // ---------- Promo Image ----------
    this.promoImageHeader = page.getByRole("heading", { name: "Promo Image" });
    this.promoImageDescription = page.getByText(
      "Here are the recommendations for image/file.",
      { exact: false }
    );
    this.promoImageSizeText = page.getByText("Image Size: 560px X 350px");
    this.promoImageFormatText = page.getByText("Image Format: .jpg", {
      exact: false,
    });
    this.promoImageUploadButton = page
      .locator("button, div")
      .filter({
        hasText: /^Select files\.\.\.$/,
      })
      .first();

    // Access / Content Areas
    this.trainingAccessHeader = page.getByRole("heading", {
      name: "Training Access",
    });
    this.accessLevelWidget = page.locator(
      'span.k-dropdown[aria-controls="EventAccessId_listbox"]'
    );
    this.accessLevelDropdownArrow = this.accessLevelWidget.locator(".k-select");
    this.accessLevelSelectedText = this.accessLevelWidget.locator(".k-input");
    this.openToAllOption = page.getByRole("option", { name: /Open to all/i });
    this.contentAreasGrid = page.locator(
      "#SelectedEventContentAreaGroupsString"
    );

    // Checkbox for "Underserved Populations" row
    this.underservedPopulationsCheckbox = this.contentAreasGrid
      .locator("tr", { hasText: "Underserved Populations" })
      .locator("input.k-checkbox");

    // Save
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.successToast = page.getByText("Event saved");
  }

  async fillDescription(text: string) {
    // Wait until the Kendo editor is initialized on #Description
    await this.page.waitForFunction(() => {
      // @ts-ignore
      const editor = (window as any).$("#Description")?.data("kendoEditor");
      return !!editor;
    });

    await this.page.evaluate((value) => {
      // @ts-ignore – jQuery + Kendo are available in the app, even if TS doesn't know
      const editor = (window as any).$("#Description").data("kendoEditor");
      editor.value(value);
    }, text);
  }

  async fillNotes(text: string) {
    // Wait for the Kendo editor for AdminNotes to be ready
    await this.page.waitForFunction(() => {
      // @ts-ignore
      const editor = (window as any).$("#AdminNotes")?.data("kendoEditor");
      return !!editor;
    });

    await this.page.evaluate((value) => {
      // @ts-ignore – jQuery + Kendo exist in the app
      const editor = (window as any).$("#AdminNotes").data("kendoEditor");
      editor.value(value);
    }, text);
  }

  // ---------- Navigation helpers ----------

  async openNewEventFromSidebar() {
    await this.trainingsEventsMenu.click();
    await this.newEventLink.click();
  }

  async openSingleEvent() {
    await this.singleEventLink.click();
  }

  async verifyTrainingEventsHeading() {
    await expect(this.trainingEventsHeading).toBeVisible();
  }

  async verifyAllTabsAreVisible() {
    await expect(this.basicInformationTab).toBeVisible();
    await expect(this.promoImageTab).toBeVisible();
    await expect(this.trainersTab).toBeVisible();
    await expect(this.trainingAccessTab).toBeVisible();
    await expect(this.contentAreasTab).toBeVisible();
    await expect(this.publicationInformationTab).toBeVisible();
    await expect(this.occupationCountTab).toBeVisible();
  }

  // ---------- Fill Basic Information ----------

  async fillBasicInformation(data: SingleEventData) {
    // Use common function to generate unique title
    const uniqueTitle = CommonFunctions.appendRandomNumber(data.eventTitle, 3);

    this.generatedEventTitle = uniqueTitle; // optional: keep it for later assertions

    await this.eventTitleInput.fill(uniqueTitle);
    await this.hoursInput.fill(data.hours);
    await this.executiveSummaryInput.fill(data.executiveSummary);

    await this.fillDescription(data.description);

    await this.fillNotes(data.notes);

    await this.brochureUrlInput.fill(data.brochureUrl);
    await this.fileLocationInput.fill(data.fileLocation);
    await this.tagInput.fill(data.tag);
  }

  // ---------- Registration / Notifications ----------

  async fillNotificationEmails(data: SingleEventData) {
    await this.hasRegistrationCheckbox.check();

    await this.accommodationsNotificationEmailInput.fill(
      data.accommodationsNotificationEmail
    );

    await this.eventRegistrationNotificationEmailInput.fill(
      data.eventRegistrationNotificationEmail
    );
    await this.eventRegistrationCancellationNotificationEmailInput.fill(
      data.eventRegistrationCancellationNotificationEmail
    );
    await this.surveyNotificationEmailInput.fill(data.surveyNotificationEmail);
    await this.waitlistNotificationEmailInput.fill(data.eventWaitlistEmail);
    await this.surveyLinkFromCustomFormsInput.fill(
      data.surveyLinkFromCustomForms
    );
  }

  // ---------- Event Details (dates / venue) ----------

  async fillEventDetails(data: SingleEventData) {
    await this.venueInput.fill(data.venue);
    await this.startDateInput.fill(data.startDate);
    await this.endDateInput.fill(data.endDate);
    await this.basicInformationTab.click();
  }

  // Promo Image
  async verifyPromoImage() {
    await expect(this.promoImageHeader).toBeVisible();
    await expect(this.promoImageDescription).toBeVisible();
    await expect(this.promoImageSizeText).toBeVisible();
    await expect(this.promoImageFormatText).toBeVisible();
    await expect(this.promoImageUploadButton).toBeVisible();
    await this.promoImageTab.click();
    await this.trainersTab.click();
  }
  // ---------- Training Access & Content Areas ----------

  async configureAccessAndContentAreas() {
    await expect(this.accessLevelWidget).toBeVisible();
    await this.accessLevelDropdownArrow.click();
    await this.openToAllOption.click();
    await expect(this.accessLevelSelectedText).toHaveText(/Open to all/i);
    await expect(this.contentAreasGrid).toBeVisible();
    await this.underservedPopulationsCheckbox.check();
    await expect(this.underservedPopulationsCheckbox).toBeChecked();
  }

  // ---------- Full flow helper ----------

  async createSingleEvent(data: SingleEventData) {
    await this.verifyTrainingEventsHeading();
    await this.verifyAllTabsAreVisible();

    await this.fillBasicInformation(data);
    await this.fillNotificationEmails(data);
    await this.fillEventDetails(data);
    await this.configureAccessAndContentAreas();

    await this.clickSave();
    await expect(this.successToast).toBeVisible();
  }

  // ---------- Save ----------

  async clickSave() {
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
  }
}
