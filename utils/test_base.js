import {test} from '@playwright/test';

exports.customtest = test.extend({
    testDataForOrder:{

        username: "practice_automation@gmail.com",
        user_password: "Learning143@",
        product_name: "ZARA COAT 3",
        cvv: "999",
        nameOnCard: "madhu",
        couponcode: "rahulshettyacademy"
    }

})


