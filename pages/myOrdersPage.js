import { expect } from '@playwright/test'



export class MyOrdersPage {
    constructor(page) {
        this.page = page
        this.product_name_locator = 'th[scope="row"] ~ td:nth-of-type(2)'
        this.product_price_locator = 'th[scope="row"] ~ td:nth-of-type(3)'
        this.available_orders = page.locator('table tbody tr ');

    }

    async gotoOrderHistoryPage() {
        await this.page.getByText('Orders History Page').click()
    }

    async checkTheLatestOrderAndSeeDetails(order_id, selected_product=null, product_price=null) {

        await expect(this.available_orders.first()).toBeVisible()
        const available_orders_length = await this.available_orders.count()

        function assert(condition, message) {
            if (!condition) {
                throw new Error(message || "Assertion failed");
            }
        }

        for (let i = 0; i < available_orders_length; i++) {
            if (!product_price){

                if (await this.available_orders.nth(i).locator('th').textContent() === order_id) {

                    assert(await this.available_orders.nth(i).locator(this.product_name_locator).textContent() === selected_product, "Product name is not matched")
                    assert(await this.available_orders.nth(i).locator(this.product_price_locator).textContent() === product_price, "Product price is not matched")
                    await this.available_orders.nth(i).getByRole('button', { name: 'View' }).click()
                    break
            
                }

            }

            else

            {
                await this.available_orders.nth(i).getByRole('button', { name: 'View' }).click()
                break

            }
           
        }

    }
}