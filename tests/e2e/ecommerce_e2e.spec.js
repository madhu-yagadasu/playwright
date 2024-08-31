import { test } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'
import { ProductsPage } from '../../pages/productPage'
import { CartPage } from '../../pages/cartPage'
import { OrderPage } from '../../pages/orderPage'
import { OrderConfirmationPage } from '../../pages/orderConfirmationPage'
import { MyOrdersPage } from '../../pages/myOrdersPage'
const dataset = JSON.parse(JSON.stringify(require("../../utils/PlaceOrderTestData.json")))

test('ecommerce_e2e', { tag: '@regression' }, async ({ browser }) => {

    /* end to end test case for e commerce website*/

    const Context = await browser.newContext()
    const page = await Context.newPage()



    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.validateLogin(dataset.username, dataset.user_password)

    const productsPage = new ProductsPage(page)
    await productsPage.searchProductAddToCart(dataset.product_name)
    await productsPage.verifyProductAddedAlert()
    await productsPage.checkNumberOfProducts()

    const cartPage = new CartPage(page)
    await cartPage.goToCart()
    await cartPage.checkMyCartTextExists()
    await cartPage.checkCartProductNameEqualsSelectedProduct(dataset.product_name)
    await cartPage.checkCartProductPriceEqualsSelectedProductPrice(productsPage.getItemPrice())
    await cartPage.checkOut()

    const orderpage = new OrderPage(page)
    await orderpage.checkUserName(dataset.username)
    await orderpage.checkCreditCardPaymentIsEnabled()
    await orderpage.checkCartProductNameEqualsSelectedProduct(dataset.product_name)
    await orderpage.fillCardDetails(dataset.cvv, dataset.nameOnCard)
    await orderpage.applyCoupon(dataset.couponcode)
    await orderpage.selectCountry()
    await orderpage.placeOrder()


    const orderConfirmationPage = new OrderConfirmationPage(page)
    await orderConfirmationPage.checkThankyouForOrderTextExists()
    await orderConfirmationPage.checkProductNameIsVisible(dataset.product_name)
    await orderConfirmationPage.saveOrderId()
    await orderConfirmationPage.checkProductPrice(productsPage.getItemPrice())


    const myOrdersPage = new MyOrdersPage(page)
    await myOrdersPage.gotoOrderHistoryPage()
    await myOrdersPage.checkTheLatestOrderAndSeeDetails(dataset.product_name, productsPage.getItemPrice(), orderConfirmationPage.order_id)

})