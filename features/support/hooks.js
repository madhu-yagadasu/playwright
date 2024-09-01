import { Before, After, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { chromium } from 'playwright'
import { PassThrough } from "stream";


Before(async function(){
    const browser = await chromium.launch({ headless: false });

    const context = await browser.newContext()
    this.page = await context.newPage()
})

BeforeStep(
    async function(){
       
}
)

AfterStep(async function({result}){

    if (result.status===Status.FAILED){
        await this.page.screenshot({path:'screenshot.png'})
    }

})

After(async function(){
    console.log("we are successfully at the end of the file")
})