import { test, expect } from '@playwright/test'

test('calneder_functionality', async ({ page }) => {


    const month = 6
    const date = '23'
    const year = '2022'

    const expected_list = ["", String(month), date, year]

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    await page.locator("div[class='react-date-picker__inputGroup']").click()

    await page.locator("span[class*=react-calendar__navigation__label__labelText]").click()
    await page.locator('span[class*="label__labelText "]').click()

    await page.getByRole('button', { name: year }).click()

    await page.locator('.react-calendar__year-view__months button').nth(month - 1).click()

    await page.locator('.react-calendar__month-view__days__day').filter({ hasText: date }).click()



    const inputs = page.locator('div[class="react-date-picker__inputGroup"] input');

    for (let index = 1; index < await inputs.count(); index++) {
        expect(await inputs.nth(index).getAttribute('value')).toEqual(expected_list[index])
    }

})