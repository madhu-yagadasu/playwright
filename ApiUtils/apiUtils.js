export class ApiUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload

    }

    async getToken() {

        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.loginPayload })
        const loginResponseJson = await loginResponse.json()

        console.log(loginResponseJson)


        let token = loginResponseJson.token
        return token

    }

    async createOrder(ordersPayload) {
        let response = {}
        response.token = await this.getToken()
        const ordersResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: ordersPayload,
            headers: {
                'authorization': response.token,
                'content-type': 'application/json',
            }
        })


        const orderResponseJson = await ordersResponse.json()
        const orderId = orderResponseJson.orders[0]
        response.orderId = orderId
        return response

    }

}


