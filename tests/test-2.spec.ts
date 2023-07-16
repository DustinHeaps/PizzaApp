
import { test, expect } from '@playwright/test';
import { OrderPage } from '../page-objects/orderPage';



test('Create an order', async ({ page }) => {

  const orderPage = new OrderPage(page)

  await orderPage.visit()

  await page.getByTestId('fullname').click(); 
  await orderPage.addName('John Smith')
  await page.getByRole('button', { name: 'Start Ordering' }).click();
  await orderPage.addItemsToOrder({ hasText: 'Margheritatomato, mozzarella, basil$12.00Add to cart' })
  await orderPage.addItemsToOrder({hasText: 'Romanatomato, mozzarella, prosciutto$15.00Add to cart' })

  await page.getByRole('link', { name: 'Open cart →' }).click();

  // await expect(page.locator('.fooobar').toHaveCount(42)
  await page.getByRole('link', { name: 'Order pizzas' }).click();
  await page.locator('input[name="phone"]').click();
  await page.locator('input[name="phone"]').fill('7165313006');
  await page.locator('div').filter({ hasText: 'Ready to order? Let\'s go!First NamePhone numberAddressGet positionWant to yo giv' }).nth(2).click();
  await page.locator('input[name="address"]').click();
  await page.locator('input[name="address"]').click();
  await page.locator('input[name="address"]').fill('123 Main st');
  // await page.getByRole('button', { name: 'Order now from $14.40' }).click();
});


// await page.getByRole('listitem').filter({ hasText: 'Margheritatomato, mozzarella, basil$12.00Add to cart' }).getByRole('button', { name: 'Add to cart' }).click();
// await page.getByRole('link', { name: 'Open cart →' }).click();
// await page.getByRole('button', { name: '+' }).click();
// await page.getByRole('button', { name: 'Delete' }).click();
// await page.getByRole('link', { name: '← Back to menu' }).click();


await page.getByRole('listitem').filter({ hasText: 'Margheritatomato, mozzarella, basil$12.00Add to cart' }).getByRole('button', { name: 'Add to cart' }).click();
await page.getByText('1 pizzas$12.00Open cart →').click();
await page.getByRole('link', { name: 'Open cart →' }).click();
await page.getByRole('button', { name: '+' }).click();
await page.getByText('$24.00-2+Delete').click();
await page.getByRole('button', { name: '-' }).click();
await page.getByText('2', { exact: true }).click();
await page.getByText('2', { exact: true }).click();