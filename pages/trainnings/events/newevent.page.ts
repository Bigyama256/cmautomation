
import { BasePage } from "../../basePage";
import { Locator, Page, expect } from "@playwright/test";


export class NewEventPage extends BasePage {
  readonly trainingsEventsMenu: Locator;
  readonly newTrainingEvent: Locator;
  readonly typeOfEventHeading: Locator;
  readonly helpIcon: Locator;
  readonly descriptionText: Locator;
  readonly singleEventLink: Locator;

  constructor(page: Page) {
    super(page);

    this.trainingsEventsMenu = page.locator('#trainingNav');
    this.newTrainingEvent = page.getByRole("link", { name: "New Event" });
    this.typeOfEventHeading = page.getByRole("heading", {
      name: "Type of Event",
    });
    this.helpIcon = page.locator(".bi.bi-question-circle");
    this.descriptionText = page.getByText("Do you want to create a");
    this.singleEventLink = page.getByRole("link", { name: "Single Event" });
  }

  async openNewEventFromSidebar() {
    await this.trainingsEventsMenu.click();
    await this.newTrainingEvent.click();
  }

  async verifyTypeOfEventPage() {
    await expect(this.typeOfEventHeading).toBeVisible();
    await expect(this.helpIcon).toBeVisible();
    await expect(this.descriptionText).toBeVisible();
    await expect(this.singleEventLink).toBeVisible();

  }

  async clickHelpIcon() {
    await this.helpIcon.click();
  }

  async clickSingleEvent() {
    await this.singleEventLink.click();
  }


}
