import { Page } from "@playwright/test";

export class OrderPage {
  readonly page: Page;
  readonly fullnameInput;
  readonly listItem;
  constructor(page: Page) {
    this.page = page;
    this.fullnameInput = page.getByTestId('fullname')
    this.listItem = page.getByRole('listitem');
  }

  visit = async () => {
    await this.page.goto("/");
  };

  addName = async (name: string) => {
    await this.fullnameInput.waitFor();
    await this.fullnameInput.fill(name)
  }

  addItemsToOrder = async (item) => {

    await this.listItem.filter(item)
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click()
    
  } 
}
