import { When, Then, Given } from '@cucumber/cucumber'
import { LoginPage } from '../../pages/loginPage.js'
import { ProductsPage } from '../../pages/productPage.js'
import { CartPage } from '../../pages/cartPage.js'
import { OrderPage } from '../../pages/orderPage.js'



Given('a login to Ecommerce application with {string} and {string}', async function (username, password) {
  const loginPage = new LoginPage(this.page)
  await loginPage.goto()
  await loginPage.validateLogin(username, password)
});


When('Add {string} to the cart', async function (product_name) {
  this.productsPage = new ProductsPage(this.page)
  await this.productsPage.searchProductAddToCart(product_name)
  await this.productsPage.verifyProductAddedAlert()
  await this.productsPage.checkNumberOfProducts()
});


Then('Verify {string} is displayed in the cart', async function (product_name) {
  const cartPage = new CartPage(this.page)
  await cartPage.goToCart()
  await cartPage.checkMyCartTextExists()
  await cartPage.checkCartProductNameEqualsSelectedProduct(product_name)
  await cartPage.checkCartProductPriceEqualsSelectedProductPrice(this.productsPage.getItemPrice())
  await cartPage.checkOut()
});

When('Enter valid details {string} {string} {string} {string} {string} place the order', { timeout: 10000 }, async function (username, product_name, cvv, nameOnCard, couponcode) {
  const orderpage = new OrderPage(this.page)
  await orderpage.checkUserName(username)
  await orderpage.checkCreditCardPaymentIsEnabled()
  await orderpage.checkCartProductNameEqualsSelectedProduct(product_name)
  await orderpage.fillCardDetails(cvv, nameOnCard)
  await orderpage.applyCoupon(couponcode)
  await orderpage.selectCountry()
  await orderpage.placeOrder()
});


