import { test, request } from '@playwright/test'
import { ApiUtils } from '../../ApiUtils/apiUtils';

const loginPayload = { userEmail: "practice_automation@gmail.com", userPassword: "Learning143@" }
const ordersPayload = { orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }

let response


test.beforeAll('api call', async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(ordersPayload)
})



test('@web security test request intercept', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client')

    await page.getByRole('button', { name: '  ORDERS' }).click()


    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        async route => await route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })


    )

    await page.pause()

    await page.locator('button:has-text("View")').first().click()

})