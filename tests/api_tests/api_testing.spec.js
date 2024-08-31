import { test, request, expect } from '@playwright/test'
import { ApiUtils } from '../../ApiUtils/apiUtils'
import {MyOrdersPage} from '../../pages/myOrdersPage'

const loginPayload = { userEmail: "practice_automation@gmail.com", userPassword: "Learning143@" }
const ordersPayload = { orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }

let response


test.beforeAll('inject the login jwt', async () => {
    /* will login before  add some orders with the help of api post method*/

    const apiContext = await request.newContext()
    const apiUtils = new ApiUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(ordersPayload)
})



test('pre_odered_api_test',{tag:'@apitest'}, async ({ browser }) => {

    const Context = await browser.newContext()
    const page = await Context.newPage()

    /* Login page is by passed with api */
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)
    await page.goto('https://rahulshettyacademy.com/client');

    /* click on the orders tab*/
    await page.getByRole('button', { name: '  ORDERS' }).click()


    /* my orders page */
    const myOrdersPage = new MyOrdersPage(page)
    await myOrdersPage.checkTheLatestOrderAndSeeDetails( response.order_id)
    

})

