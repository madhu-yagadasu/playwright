import { test, request } from '@playwright/test'
import { ApiUtils } from '../../ApiUtils/apiUtils';

const loginPayload = { userEmail: "practice_automation@gmail.com", userPassword: "Learning143@" }
const ordersPayload = { orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }

let response
const fakePayLoad = { data: [], message: "No Orders" }

test.beforeAll('api call', async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(ordersPayload)
})

test('@mock no_orders_mock', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client')

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/66afa7a9ae2afd4c0b3f02d7',
        async route => {

            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayLoad)

            await route.fulfill({
                response,
                body
            })
        })

    await page.getByRole('button', { name: '  ORDERS' }).click()
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/66afa7a9ae2afd4c0b3f02d7')
    await page.pause()








})