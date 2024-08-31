import { test, expect } from '@playwright/test'


test('moreValidations', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.goBack();
    await page.goForward();
    await page.getByRole('button', { name: 'Hide' }).click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    await page.getByRole('button', { name: 'Show' }).click()
    await expect(page.locator("#displayed-text")).toBeVisible()


    await page.locator('#gf-BIG').scrollIntoViewIfNeeded()



    const element = page.locator('#select-class-example')
    await element.scrollIntoViewIfNeeded()



})



test('Scrooling_methods', async ({ page }) => {


    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    const table = page.locator('.tableFixHead')

    await table.scrollIntoViewIfNeeded()

    await table.hover()

    await page.mouse.wheel(0, 50);



})


test('alert', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    page.on('dialog', dialog => dialog.accept())

    await page.locator('#confirmbtn').click()

    await page.pause()
})

test('hover', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator("#mousehover").hover()

    await page.locator('//div[@class="mouse-hover-content"]//a[text()="Reload"]').click()

})


test('Handling & automating frames', async ({ page }) => {


    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    const frames = page.frameLocator("#courses-iframe")

    await frames.locator('li a[href="lifetime-access"]:visible').click()
    await page.pause()

})
