import { expect } from '@playwright/test'


export class OrderPage {


    constructor(page) {
        this.page = page
        this.customerName = page.locator('label[type="text"]')
        this.creditCardTab = page.locator('.payment__type')
        this.orderedProductName = page.locator('.item__title')
        this.cvv = page.locator("//div[@class='field small']//div[text()='CVV Code ']//following-sibling::input")
        this.nameOnCard = page.locator("//div[text()='Name on Card ']//following-sibling::input")
        this.couponCodeEditBox = page.locator("//div[text()='Apply Coupon ']//following-sibling::input")
        this.couponBtn = page.locator("//button[text()='Apply Coupon']")

    }

    async checkUserName(userName) {
        //check the username on the order page
        await expect(this.customerName).toContainText(userName)

    }

    async checkCreditCardPaymentIsEnabled() {
        //checks whether the credit card tab is enabled or not
        await expect(this.creditCardTab.first()).toBeEnabled()

    }

    async checkCartProductNameEqualsSelectedProduct(selected_product) {
        //confirms that product name is same as user selection
        await expect(this.orderedProductName.first()).toContainText(selected_product)

    }

    async fillCardDetails(cvv, nameOnCard) {
        //fill the details and apply the coupon
        await this.cvv.fill(cvv)
        await this.nameOnCard.fill(nameOnCard)

    }

    async applyCoupon(couponcode) {
        //applies the coupon and checks for the coupon applied popup

        await this.couponCodeEditBox.fill(couponcode)
        await this.couponBtn.click()
        await expect(this.page.getByText('* Coupon Applied')).toBeVisible()
    }

    async selectCountry() {
        //select the country and place the order

        await this.page.getByPlaceholder('Select Country').pressSequentially('Ind');
        const dropdown = this.page.locator('section .ta-results button')
        await this.page.waitForTimeout(1000)
        const dropdowns_count = await dropdown.count()

        for (let i = 0; i < dropdowns_count; i++) {

            if (await dropdown.nth(i).textContent() === ' India') {
                await dropdown.nth(i).click()
                break
            }
        }

    }


    async placeOrder() {
        await this.page.getByText('Place Order ').click()

    }

}