import { customtest } from '../../utils/test_base'
import { LoginPage } from '../../pages/loginPage'
import { ProductsPage } from '../../pages/productPage'


customtest('Login and add product', async ({ browser, testDataForOrder }) => {

    const Context = await browser.newContext()
    const page = await Context.newPage()
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.validateLogin(testDataForOrder.username, testDataForOrder.user_password)
    const productsPage = new ProductsPage(page)

    await productsPage.searchProductAddToCart(testDataForOrder.product_name)
    await productsPage.verifyProductAddedAlert()
    await productsPage.checkNumberOfProducts()


})
