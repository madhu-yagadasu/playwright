import { expect } from '@playwright/test'


export class CartPage {

    constructor(page) {
        this.page = page
        this.cartButton = page.getByRole('button', { name: 'Cart' })
        this.heading = page.getByRole('heading', { name: 'My Cart' })
        this.productName = page.locator("div[class='cartSection'] h3")
        this.productPrice = page.locator("div[class='prodTotal cartSection'] p")
        this.checkOutBtn = page.getByText('Checkout')
    }

    async checkMyCartTextExists() {
        //asserts whether the mycart heading is shown or not
        await expect(this.heading).toBeVisible()
    }

    async goToCart() {
        //click on the cart button
        await this.cartButton.first().click()
    }

    async checkCartProductNameEqualsSelectedProduct(selected_product) {
        //check whether the product name is equal to selected product or not
        expect(await this.productName.textContent()).toContain(selected_product)
    }

    async checkCartProductPriceEqualsSelectedProductPrice(product_price) {
        const product_price_in_cart = await this.productPrice.textContent()

        function assert(condition, message) {
            if (!condition) {
                throw new Error(message || "Assertion failed");
            }
        }
        assert(product_price_in_cart === product_price, "Product price is changed in the cart page")
    }

    async checkOut() {
        await this.checkOutBtn.click()
    }

}
