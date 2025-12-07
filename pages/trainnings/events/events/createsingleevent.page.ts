import { BasePage } from "../../../basePage";
import { CommonFunctions } from "../../../../functions/commonfunctions";
import { Locator, Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

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
  attendeeCapacity: string;
};

export type RegistrationFormData = {
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  pronouns: string;

  organization: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  county: string;
  zip: string;
  zip4: string;
  country: string;

  email: string;
  confirmEmail: string;
  phone: string;
  extension: string;

  occupation: string;
  jobTitle: string;
  certificationId: string;
};

export class CreateSingleEventPage extends BasePage {
  generatedEventTitle?: string;
  //  Navigation / Header 
  readonly trainingsEventsMenu: Locator;
  readonly newEventLink: Locator;
  readonly singleEventLink: Locator;
  readonly trainingEventsHeading: Locator;

  // Tabs 
  readonly basicInformationTab: Locator;
  readonly promoImageTab: Locator;
  readonly trainersTab: Locator;
  readonly trainingAccessTab: Locator;
  readonly contentAreasTab: Locator;
  readonly publicationInformationTab: Locator;
  readonly occupationCountTab: Locator;

  // Basic Information 
  readonly eventTitleInput: Locator;
  readonly hoursInput: Locator;
  readonly executiveSummaryInput: Locator;
  readonly brochureUrlInput: Locator;
  readonly fileLocationInput: Locator;
  readonly tagInput: Locator;
  readonly hasRegistrationCheckbox: Locator;

  // Registration / Notification Emails 
  readonly accommodationsNotificationEmailInput: Locator;
  readonly eventRegistrationNotificationEmailInput: Locator;
  readonly eventRegistrationCancellationNotificationEmailInput: Locator;
  readonly surveyNotificationEmailInput: Locator;
  readonly waitlistNotificationEmailInput: Locator;
  readonly surveyLinkFromCustomFormsInput: Locator;

  // Registration & trainers tab
  readonly attendeeCapacityInput: Locator;
  readonly registrationInformationTab: Locator;

  // Event Details  
  readonly venueInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;

  // Venue
  readonly promoImageHeader: Locator;
  readonly promoImageDescription: Locator;
  readonly promoImageSizeText: Locator;
  readonly promoImageFormatText: Locator;
  readonly promoImageUploadButton: Locator;

  // Access / Content Areas 
  readonly trainingAccessHeader: Locator;
  readonly accessLevelWidget: Locator;
  readonly accessLevelDropdownArrow: Locator;
  readonly accessLevelSelectedText: Locator;
  readonly openToAllOption: Locator;

  readonly contentAreasGrid: Locator;
  readonly underservedPopulationsCheckbox: Locator;

  //  Save 
  readonly saveButton: Locator;
  readonly successToast: Locator;

  // Training Event Confirmation Page
  readonly trainingEventConfirmationHeader: Locator;
  readonly successIcon: Locator;
  readonly trainingEventAddedText: Locator;
  readonly addNewEventBtn: Locator;
  readonly duplicateTrainingBtn: Locator;
  readonly editTrainingBtn: Locator;
  readonly viewTrainingBtn: Locator;
  readonly currentEventsBtn: Locator;
  readonly currentEventsNav: Locator;

  // Current event grid to search event and copy its link to register
  readonly titleFilterInput: Locator;
  readonly gridRow: Locator;
  readonly copyLinkButton: Locator;

  //  Public Registration Form (trainingevent/details) 
  readonly registerButton: Locator;
  readonly singleRegistrationLink: Locator;
  readonly prefixInput: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly suffixInput: Locator;
  readonly pronounInput: Locator;

  // Organization & address
  readonly organizationInput: Locator;
  readonly streetAddressInput: Locator;
  readonly streetAddress2Input: Locator;
  readonly cityInput: Locator;
  readonly stateSelect: Locator;
  readonly countyDropdown: Locator;
  readonly zipCodeInput: Locator;
  readonly zipCodeX4Input: Locator;
  readonly countrySelect: Locator;

  // Contact
  readonly registrationEmailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly registrationPhoneInput: Locator;
  readonly extensionInput: Locator;
  readonly registrationSaveButton: Locator;

  // Occupation
  readonly occupationDropdown: Locator;
  readonly occupationOtherInput: Locator;

  // Job title
  readonly jobTitleInput: Locator;

  // Certification Id
  readonly certificationIdInput: Locator;

  // Registration confirmation 
  readonly registrationConfirmationHeading: Locator;
  readonly registrationConfirmationIcon: Locator;
  readonly registrationConfirmationWrapper: Locator;

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
    
    // Registration & trainers tab
    this.attendeeCapacityInput = page.getByRole("spinbutton", {
      name: "Attendee Capacity",
    });
    this.registrationInformationTab = page
      .locator("a")
      .filter({ hasText: "Registration Information" })
      .first();
    this.trainersTab = page.locator("a").filter({ hasText: "Trainers" });

    // Event Details
    this.venueInput = page.locator("#EventAddress");
    this.startDateInput = page.locator("#StartDate");
    this.endDateInput = page.locator("#EndDate");

    // Promo Image
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

    // Training Event Confirmation Page
    this.trainingEventConfirmationHeader = page
      .locator("a")
      .filter({ hasText: "Training Event Confirmation" });

    this.successIcon = page.locator(".bi.bi-check-circle");

    this.trainingEventAddedText = page.getByText("Training Event added");

    this.addNewEventBtn = page.getByRole("link", { name: "Add New Event" });
    this.duplicateTrainingBtn = page.getByRole("link", {
      name: "Duplicate Training",
    });
    this.editTrainingBtn = page.getByRole("link", { name: "Edit Training" });
    this.viewTrainingBtn = page.getByRole("link", { name: "View Training" });

    this.currentEventsBtn = page
      .locator("#bodyContent")
      .getByRole("link", { name: "Current Events" });
    this.currentEventsNav = page.locator("#aCurrentEvent");

    // Current event grid to search event and copy its link to register
    this.titleFilterInput = page.getByRole("combobox", { name: "Title" });
    this.gridRow = page.locator("tbody > tr.k-master-row");
    this.copyLinkButton = page.locator(
      "button.copy-link-value[title='Copy Link']"
    );

    //  Public Registration Form (trainingevent/details) 
    this.registerButton = page.getByRole("button", { name: "Register" });

    this.singleRegistrationLink = page.getByRole("link", {
      name: "Single Registration",
    });

    this.prefixInput = page.locator("#TrainingAttendeeInfo_NamePrefix");
    this.firstNameInput = page.locator("#TrainingAttendeeInfo_NameFirst");
    this.middleNameInput = page.locator("#TrainingAttendeeInfo_NameMiddle");
    this.lastNameInput = page.locator("#TrainingAttendeeInfo_NameLast");
    this.suffixInput = page.locator("#TrainingAttendeeInfo_NameSuffix");
    this.pronounInput = page.locator("#TrainingAttendeeInfo_NamePronoun");

    //  Organization & Address 
    this.organizationInput = page.locator("#Organization");

    this.streetAddressInput = page.locator(
      "#TrainingAttendeeInfo_AddressStreet"
    );
    this.streetAddress2Input = page.locator(
      "#TrainingAttendeeInfo_AddressStreet2"
    );
    this.cityInput = page.locator("#TrainingAttendeeInfo_AddressCity");

    this.stateSelect = page.locator("#TrainingAttendeeInfo_AddressState");

    // Kendo County dropdown wrapper (click this to open list)
    this.countyDropdown = page.locator(
      'span.k-dropdown[aria-controls="TrainingAttendeeInfo_CountyId_listbox"]'
    );

    this.zipCodeInput = page.locator("#TrainingAttendeeInfo_AddressZip");
    this.zipCodeX4Input = page.locator("#TrainingAttendeeInfo_AddressZipX4");

    this.countrySelect = page.locator("#TrainingAttendeeInfo_AddressCountry");

    //  Contact 
    this.registrationEmailInput = page.locator("#TrainingAttendeeInfo_Email");
    this.confirmEmailInput = page.locator("#TrainingAttendeeInfo_ConfirmEmail");
    this.registrationPhoneInput = page.locator("#TrainingAttendeeInfo_Phone");
    this.extensionInput = page.locator("#TrainingAttendeeInfo_PhoneExtension");

    //  Occupation
    this.occupationDropdown = page.locator(
      'span.k-dropdown[aria-controls="TrainingAttendeeInfo_OccupationId_listbox"]'
    );
    this.occupationOtherInput = page.locator(
      "#TrainingAttendeeInfo_OccupationOther"
    );

    //  Job Title 
    this.jobTitleInput = page.locator("#TrainingAttendeeInfo_JobTitle");

    //  Certification Id 
    this.certificationIdInput = page.locator("#CertificationId");

    this.registrationSaveButton = page.getByRole("button", { name: "Save" });

    //  Registration confirmation 
    this.registrationConfirmationHeading = page.locator(
      "a.toggleIndexLink .toggleText",
      {
        hasText: "Registration Confirmation",
      }
    );

    this.registrationConfirmationIcon = page.locator("#publicwrapper i");

    this.registrationConfirmationWrapper = page.locator("#publicwrapper");
  }

  async fillDescription(text: string) {
    await this.page.waitForFunction(() => {
      const editor = (window as any).$("#Description")?.data("kendoEditor");
      return !!editor;
    });

    await this.page.evaluate((value) => {
      const editor = (window as any).$("#Description").data("kendoEditor");
      editor.value(value);
    }, text);
  }

  async fillNotes(text: string) {
    await this.page.waitForFunction(() => {
      const editor = (window as any).$("#AdminNotes")?.data("kendoEditor");
      return !!editor;
    });

    await this.page.evaluate((value) => {
      const editor = (window as any).$("#AdminNotes").data("kendoEditor");
      editor.value(value);
    }, text);
  }

  // Navigation helpers 

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

  //  Filling Basic Information 

  async fillBasicInformation(data: SingleEventData) {
    //  Unique event title
    const uniqueTitle = CommonFunctions.appendRandomNumber(data.eventTitle, 3);

    this.generatedEventTitle = uniqueTitle; 

    await this.eventTitleInput.fill(uniqueTitle);
    await this.hoursInput.fill(data.hours);
    await this.executiveSummaryInput.fill(data.executiveSummary);

    await this.fillDescription(data.description);

    await this.fillNotes(data.notes);

    await this.brochureUrlInput.fill(data.brochureUrl);
    await this.fileLocationInput.fill(data.fileLocation);
    await this.tagInput.fill(data.tag);
  }

  //  Registration / Notifications 

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
  //  Registration & trainers tab
  async fillAttendeeCapacity(data: SingleEventData) {
    await expect(this.registrationInformationTab).toBeVisible();
    await expect(this.attendeeCapacityInput).toBeVisible();
    await this.attendeeCapacityInput.click();
    await this.attendeeCapacityInput.fill(data.attendeeCapacity);
    await this.registrationInformationTab.click();
    await this.trainersTab.click();
  }

  //  Event Details (dates / venue) 

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
  //  Training Access & Content Areas 

  async configureAccessAndContentAreas() {
    await expect(this.accessLevelWidget).toBeVisible();
    await this.accessLevelDropdownArrow.click();

    await this.openToAllOption.click();
    await expect(this.accessLevelSelectedText).toHaveText(/Open to all/i);

    await expect(this.contentAreasGrid).toBeVisible();
    await this.underservedPopulationsCheckbox.check();
    await expect(this.underservedPopulationsCheckbox).toBeChecked();
  }

  //  Full flow helper 

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

  //  Save 

  async clickSave() {
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
  }

  //  Training Event Confirmation Page 
  async verifyTrainingEventConfirmationPage() {
    await expect(this.trainingEventConfirmationHeader).toBeVisible();
    await expect(this.successIcon).toBeVisible();
    await expect(this.trainingEventAddedText).toBeVisible();

    await expect(this.addNewEventBtn).toBeVisible();
    await expect(this.duplicateTrainingBtn).toBeVisible();
    await expect(this.editTrainingBtn).toBeVisible();
    await expect(this.viewTrainingBtn).toBeVisible();
    await this.viewTrainingBtn.click();
  }
  // Extract name of currently created event
  async getCreatedEventName(): Promise<string> {
    const fullTitle = await this.page.title();
    return fullTitle.split(" - ")[0].trim();
  }

  // Navigate to current events page
  async goToCurrentEvents() {
    await this.currentEventsNav.click();
  }

  // Validate event in grid
  async filterEventsByTitle(title: string) {
    await this.page.getByRole("columnheader", { name: "Title" }).waitFor();
    await this.titleFilterInput.click();
    await this.titleFilterInput.fill("");
    await this.titleFilterInput.fill(title);
    await this.titleFilterInput.press("Enter");
    await this.titleFilterInput.click();
  }

  async verifyEventVisibleInGrid(title: string) {
    const eventLink = this.page.getByRole("link", { name: title });
    await expect(eventLink).toBeVisible();
  }

  getCopyLinkButtonForEvent(eventName: string) {
    return this.gridRow
      .filter({ has: this.page.getByRole("link", { name: eventName }) })
      .locator("button.copy-link-value[title='Copy Link']");
  }

  async clickCopyLinkForEvent(eventName: string) {
    const btn = this.getCopyLinkButtonForEvent(eventName);
    await btn.click();
  }

  async getCopiedEventUrl(eventName: string): Promise<string | null> {
    const btn = this.getCopyLinkButtonForEvent(eventName);
    return await btn.getAttribute("value");
  }

  // Public Event Page

  async verifyPublicEventPageOpened(expectedEventTitle: string) {
    await expect(this.page).toHaveURL(/trainingevent\/details/);
    await expect(
      this.page.getByRole("heading", { name: expectedEventTitle })
    ).toBeVisible();
  }

  // Faker helper for registrants

  private generateFakerRegistrant(): RegistrationFormData {
    const firstName = faker.person.firstName();
    const middleName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });

    return {
      prefix: faker.person.prefix(),
      firstName,
      middleName,
      lastName,
      suffix: faker.person.suffix(),
      pronouns: "He/Him",

      organization: faker.company.name(),
      streetAddress: faker.location.streetAddress(),
      streetAddress2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: "CA",
      county: "Los Angeles",
      zip: faker.location.zipCode("#####"),
      zip4: faker.string.numeric(4),
      country: "US",

      email,
      confirmEmail: email,
      phone: faker.phone.number({ style: "national" }),
      extension: faker.string.numeric(3),

      occupation: "Select Occupation",
      jobTitle: faker.person.jobTitle(),
      certificationId: faker.string.uuid(),
    };
  }

  // Event Registration Form

  async openRegistrationForm() {
    await this.registerButton.click();
  }

  async clickSingleRegistration() {
    await expect(this.singleRegistrationLink).toBeVisible();
    await this.singleRegistrationLink.click();
  }

  async verifyRegistrationFormFieldsVisible() {
    await expect(this.prefixInput).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.middleNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.suffixInput).toBeVisible();
    await expect(this.pronounInput).toBeVisible();
    await expect(this.organizationInput).toBeVisible();
    await expect(this.streetAddressInput).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.stateSelect).toBeVisible();
    await expect(this.countyDropdown).toBeVisible();
    await expect(
      this.page.getByText("Zip Code", { exact: true })
    ).toBeVisible();
    await expect(this.page.getByText("Zip Code X4")).toBeVisible();
    await expect(this.page.getByText("Country").first()).toBeVisible();
    await expect(this.page.getByText("Email").nth(1)).toBeVisible();
    await expect(this.page.getByText("Confirm Email")).toBeVisible();
    await expect(this.page.getByText("Phone").first()).toBeVisible();
    await expect(this.page.getByText("Extension")).toBeVisible();
    await expect(
      this.page.getByText(
        "Attendee Profession Information Complete the information for what best fits"
      )
    ).toBeVisible();
    await expect(
      this.page.getByText("Occupation", { exact: true })
    ).toBeVisible();
    await expect(this.page.getByText("Job Title")).toBeVisible();
    await expect(this.page.getByText("Certification Id (if")).toBeVisible();

    await expect(this.registrationEmailInput).toBeVisible();
    await expect(this.registrationPhoneInput).toBeVisible();

    await expect(this.registrationSaveButton).toBeVisible();
  }

  async fillRegistrationForm(data: any) {
    await this.prefixInput.fill(data.prefix);
    await this.firstNameInput.fill(data.firstName);
    await this.middleNameInput.fill(data.middleName);
    await this.lastNameInput.fill(data.lastName);
    await this.suffixInput.fill(data.suffix);
    await this.pronounInput.fill(data.pronouns);

    await this.organizationInput.fill(data.organization);
    await this.streetAddressInput.fill(data.streetAddress);
    await this.streetAddress2Input.fill(data.streetAddress2);
    await this.cityInput.fill(data.city);

    await this.stateSelect.waitFor();
    await this.stateSelect.selectOption(data.state);

    await this.countyDropdown.click();
    const countyOptions = this.page.locator(
      '#TrainingAttendeeInfo_CountyId_listbox li[role="option"]'
    );
    await countyOptions.first().waitFor({ state: "visible" });
    const desiredCounty = countyOptions.filter({ hasText: data.county });
    if (await desiredCounty.count()) {
      await desiredCounty.first().click();
    } else {
      await countyOptions.nth(1).click();
    }
    await this.zipCodeInput.fill(data.zip);
    await this.zipCodeX4Input.fill(data.zip4);
    await this.countrySelect.selectOption(data.country);

    await this.registrationEmailInput.fill(data.email);
    await this.confirmEmailInput.fill(data.confirmEmail);

    await this.registrationPhoneInput.fill(data.phone);
    await this.extensionInput.fill(data.extension);

    await this.jobTitleInput.fill(data.jobTitle);
    await this.certificationIdInput.fill(data.certificationId);

    // Occupation dropdown (still placeholder)
    await this.occupationDropdown.click();
    const occupationOptions = this.page.locator(
      '#TrainingAttendeeInfo_OccupationId_listbox li[role="option"]'
    );
    await occupationOptions.first().waitFor({ state: "visible" });

    await occupationOptions.nth(1).click();
  }

  async saveRegistration() {
    await expect(this.registrationSaveButton).toBeVisible();
    await this.registrationSaveButton.click();
  }

  async registerUsingFaker() {
    const registrant = this.generateFakerRegistrant();

    await this.openRegistrationForm();
    await this.clickSingleRegistration();
    await this.verifyRegistrationFormFieldsVisible();
    await this.fillRegistrationForm(registrant);
    await this.saveRegistration();
    console.log("Registrant created via Faker:", registrant);
    await this.verifyRegistrationConfirmationPage();
  }

  async verifyRegistrationConfirmationPage() {
    await expect(this.page).toHaveURL(
      "https://staging2.coalitionmanager.org/staging-combined/eventmanager/trainingeventregistration/confirmation"
    );
    await expect(this.registrationConfirmationHeading).toBeVisible();
    await expect(this.registrationConfirmationIcon).toBeVisible();
    await expect(this.registrationConfirmationWrapper).toContainText(
      "Registration Confirmation"
    );
    await expect(this.registrationConfirmationWrapper).toContainText(
      "You’ll be hearing from us soon. If you have any questions about this event or your registration, please reach out to us."
    );
  }
}
