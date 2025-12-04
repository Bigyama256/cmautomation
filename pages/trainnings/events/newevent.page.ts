
import { BasePage } from "../../basePage";
import { Locator, Page, expect } from "@playwright/test";


export class NewEventPage extends BasePage {
  readonly trainingsEventsMenu: Locator;
  readonly newTrainingEvent: Locator;
  readonly typeOfEventHeading: Locator;
  readonly helpIcon: Locator;
  readonly singleEventLink: Locator;
  readonly typeOfEventDescription: Locator;

  constructor(page: Page) {
    super(page);

    this.trainingsEventsMenu = page.locator('#trainingNav');
    this.newTrainingEvent = page.getByRole("link", { name: "New Event" });
    this.typeOfEventHeading = page.getByRole("heading", {
      name: "Type of Event",
    });
    this.helpIcon = page.locator(".bi.bi-question-circle");
    this.singleEventLink = page.getByRole("link", { name: "Single Event" });
    this.typeOfEventDescription = page.getByText('Do you want to create a Single Event or a Series of Events?');

  }

  async openNewEventFromSidebar() {
    await this.trainingsEventsMenu.click();
    await this.newTrainingEvent.click();
  }

  async verifyTypeOfEventPage() {
    await expect(this.typeOfEventHeading).toBeVisible();
    await expect(this.helpIcon).toBeVisible();
    await expect(this.singleEventLink).toBeVisible();
    await expect(this.typeOfEventDescription).toBeVisible();


  }

  async clickHelpIcon() {
    await this.helpIcon.click();
  }

  async clickSingleEvent() {
    await this.singleEventLink.click();
  }


}
