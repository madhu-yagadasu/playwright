const ExcelJs = require('exceljs')
import { test} from '@playwright/test'
const workbook = new ExcelJs.Workbook()

async function excel() {
    await workbook.xlsx.readFile("C:/Users/yagad/Downloads/download.xlsx")
    const worksheet = workbook.getWorksheet('Sheet1');

    const cell = worksheet.getCell(2, 3)
    cell.value = "madhu_naidu"
    await workbook.xlsx.writeBuffer("C:/Users/yagad/Downloads/download.xlsx")

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellNumber) => {
            console.log(cell.value)
        })
    })
}


test('update_excel', async ({ page }) => {
//please uncomment this run with your local file path

    /*

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')

    const download = page.waitForEvent('download')

    await page.getByRole('button', { name: "Download" }).click()
    await download
    await excel()
    await page.locator("#fileinput").click()
    await page.waitForTimeout(2000)
    await page.locator("#fileinput").setInputFiles("C:/Users/yagad/Downloads/download.xlsx")
    await page.waitForTimeout(2000)

    */

})