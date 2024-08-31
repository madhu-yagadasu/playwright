export class LoginPage {

    constructor(page) {
        this.page = page
        this.userEmail = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.loginBtn = page.locator('#login')
    }

    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/client')
    }

    async validateLogin(username, user_password) {
        await this.userEmail.fill(username)
        await this.password.fill(user_password)
        await this.loginBtn.click()
        await this.page.locator('div[class="card-body"]').first().waitFor({ state: "visible" })
    }

}