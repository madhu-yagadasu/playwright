import { test, expect } from '@playwright/test'
import { CartPage } from '../../pages/cartPage'
import { LoginPage } from '../../pages/loginPage'
const dataset = JSON.parse(JSON.stringify(require("../../utils/PlaceOrderTestData.json")))
let webcontext = ''

test.beforeAll('inject the cookies', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.validateLogin(dataset.username, dataset.user_password)

    await context.storageState({ path: 'Storagestate.json' })
    webcontext = await browser.newContext({ storageState: 'Storagestate.json' })

    
})

test('@session_storage go to orders page', async()=>{
    const page = await webcontext.newPage()
    await page.goto('https://rahulshettyacademy.com/client')

    const cartPage = new CartPage(page)
    await cartPage.goToCart()
    await cartPage.checkMyCartTextExists()

}) 