import { expect } from '@playwright/test'


export class OrderConfirmationPage {
    constructor(page) {
        this.page = page
        this.order_id = ''

    }

    async checkThankyouForOrderTextExists() {
        await expect(this.page.getByText('Thankyou for the order')).toBeVisible()
    }

    async checkProductNameIsVisible(selected_product) {
        await expect(this.page.getByText(selected_product)).toBeVisible()
    }

    async saveOrderId() {
        var order_id = await this.page.locator("label[class='ng-star-inserted']").textContent()
        this.order_id = order_id.split('|')[1].trim()

    }

    async checkProductPrice(product_price) {
        await expect(this.page.locator('td[class="line-item product-info-column"] div[class="title"]')).toHaveText(product_price)

    }


}
