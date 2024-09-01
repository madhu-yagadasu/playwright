Feature: Ecommerce Validations

    Feature Description : An end to end test case for Ecommerce application ie. login, select the product, add to cart, checkout page, etc..

    Scenario: Checking the ecommerce application from starting to ending
        Given a login to Ecommerce application with "practice_automation@gmail.com" and "Learning143@"
        When Add "ZARA COAT 3" to the cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details "practice_automation@gmail.com" "ZARA COAT 3" "777" "madhuyagadasu" "rahulshettyacademy" place the order