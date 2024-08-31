import { expect } from '@playwright/test'

export class ProductsPage {

    constructor(page) {
        this.page = page
        this.cardBody = page.locator('div[class="card-body"]')

    }

    setItemPrice(price) {
        this.ItemPrice = price
    }

    getItemPrice() {
        return this.ItemPrice
    }

    async searchProductAddToCart(product_name) {
        //saves the item price and selects the item 
        await this.cardBody.filter({ hasText: product_name }).getByRole('button', { name: ' Add To Cart' }).click()
        const productPrice = await this.cardBody.filter({ hasText: product_name }).locator('.text-muted').textContent()
        this.setItemPrice(productPrice)

    }

    async verifyProductAddedAlert() {
        //confirm that product added to cart alert is shown
        await expect(this.page.getByLabel("Product Added To Cart")).toBeVisible()
    }

    async checkNumberOfProducts() {
        //checks whether the cart shows the added product numbers correctly or not 
        expect(await this.page.locator('li button label').textContent()).toContain('1')
    }


}