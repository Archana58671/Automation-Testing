import { Given, When, Then, BeforeAll, setDefaultTimeout, World, AfterStep, Status, After } from "@cucumber/cucumber";
import { expect } from "chai";
import { Browser, BrowserContext, Page } from "playwright";
import { constants } from "../../constants";
import * as fs from "fs";
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import * as chai from "chai";
import { chaiImage } from "chai-image"
chai.use(chaiImage)
const playwright = require('playwright');
let browser: Browser, context: BrowserContext, page: Page;

const records = parse(fs.readFileSync(path.join('C:\\Users\\W58671\\Onedrive - Woodside Energy Ltd\\Desktop\\study\\Playwright Cucumber', 'input.csv')), {
    columns: true,
    skip_empty_lines: true
  });
 
  
setDefaultTimeout(constants.timeout);

BeforeAll(async () => {
    browser = await playwright.chromium.launch({
        headless: false,
        channel: 'chrome'
    },);
    context = await browser.newContext({
        recordVideo:{dir: "./recordings"},
    });
    page = await context.newPage();

})

AfterStep(async function (this: World) {
    await page.waitForTimeout(2000)
    this.attach(await page.screenshot(), "image/png");
   
});

// After(async (scenario)=>{
//     if (scenario.result?.status === Status.PASSED)
//     {
//      fs.writeFileSync("C:\\Users\\W58671\\Onedrive - Woodside Energy Ltd\\Desktop\\study\\Playwright Cucumber\\Status.csv","Pass", {flag:'a+'})
//     }
// })

for (const record of records) {

Given("I opens Wircs website", { timeout: 60 * 1000 }, async function () {
    await page.goto('http://wircs-test/bwise/login');
})

When("I Login to Wircs application", async function (){
    await page.locator('#username').fill(record.username)
    await page.locator('#password').fill(record.password)
    await page.locator('select#logindomain').selectOption({ value: 'BWise' })
    await page.locator("xpath=(//input[@class='BWiseButton loginbutton'])[1]").click()
});

When("I click on Risk tile", async function () {
    await page.locator("xpath=(//div[@class='app_text'])[2]").click()
});

When("I click on Risk 1148", async function () {
    await page.click('text=Risk 11428')
});

When('I click on Submit button', { timeout: 90 * 1000 }, async function () {
    await page.click('text=Submit')
    await page.waitForTimeout(5000)
});

When('I click on Risk Grouping tile', async () => {
    await page.click('text=Risk Grouping')
});

When('I click on Custom Groups', async () => {
    await page.click('text=Custom Groups')
    await page.waitForTimeout(3000)
});

When('I Enter text in Filter section of Risk Grouping', async () => {
    await page.locator("xpath=(//span[@class='x-column-header-text-inner'])[4]").click({ force: true })
    await page.locator("xpath=(//div[@class='x-column-header-trigger'])[3]").click()
    await page.hover("xpath=(//span[@class='x-menu-item-text x-menu-item-text-default x-menu-item-indent-no-separator x-menu-item-indent-right-arrow'])[2]")
    await page.locator('[placeholder="Enter Filter Text..."]').type('Test')
    await page.click("(//div[@class='x-splitter bw-dashboard-splitter x-border-item x-box-item x-splitter-default x-splitter-horizontal x-unselectable'])[1]")
});

When('I click on Reports', async function () {
    await page.click('text=Reports')
});

When('I Click on side-by-side Report', { timeout: 60 * 2000 }, async function () {
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('text=Side-by-Side Report')
    ]);
    await newPage.waitForLoadState();
    await page.waitForTimeout(20000)
    await (await newPage.screenshot({ path: 'Screenshots\\expected.png' }))
    
});

When('I hover the mouse on Control', { timeout: 60 * 1000 }, async function () {
    await page.hover("xpath=//*[contains(text(), 'Admin')]")
});

When('I Login to Wircs application as Testuser Risk Adviser', async function () {
    await page.locator('#username').fill(record.username)
    await page.locator('#password').fill(record.password)
    await page.locator('select#logindomain').selectOption({ value: 'BWise' })
    await page.locator("xpath=(//input[@class='BWiseButton loginbutton'])[1]").click()
});

When('I click on Add button on left side', async function () {
    await page.click("xpath=//span[@class='x-btn-icon-el x-btn-icon-el-action-button-small icon-action_add ']")
});

When('I Fill the mandatory details with test owner field as Testuser WU', { timeout: 90 * 1000 }, async function () {
    await page.locator("xpath =(//*[@name = 'classRisk_ca_RiskName'])").fill(record.Riskname)
    await page.click("xpath=(//iframe[@title='Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help'])[1]")
    await page.locator('#mceu_11-button').click()
    const locdescription = page.frameLocator("xpath=(//iframe[@title='Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help'])[1]").locator("xpath=//*[@id='tinymce']/ol/li");
    await locdescription.fill('comments123');
    await page.locator("xpath=(//input[@name='classRisk_owner'])").fill('')
    await page.locator("xpath=(//input[@name='classRisk_owner'])").fill('Testuser W')
    await page.click('text =Testuser WU')
    //await page.locator("xpath=(//input[@name='classRisk_c_Entity'])").fill('Angel CCS')
    await page.locator("xpath=//div[@id='bwise-searchableDropdownfield-1323-trigger-picker']").click()
    await page.locator("xpath=//div[@data-recordindex='4']").click()
});

When('I Login to Wircs application as Testuser WU', async function () {
    await page.locator('#username').fill(record.username2)
    await page.locator('#password').fill(record.password)
    await page.locator('select#logindomain').selectOption({ value: 'BWise' })
    await page.locator("xpath=(//input[@class='BWiseButton loginbutton'])[1]").click()
});

When('I search and click on the newly created risk', async function () {
    await page.locator('[placeholder="Search Risk Name"]').click()
    await page.locator('[placeholder="Search Risk Name"]').type(record.Riskname)
    await page.keyboard.press('Enter');
    await page.click("text=Risk421")
});

When('I click on the Risk name in Risk Information section', async function () {
    await page.locator("xpath=//span[@data-qtip='Click to edit Risk']").click()
});

When('I Edit the Risk name', async function () {
    await page.locator("xpath=(//input[@class='x-form-field x-form-text x-form-text-default '])[2]").fill(record.RisknameEdit)
});

When("I Enter text in Filter section", { timeout: 60 * 1000 }, async function () {
    await page.waitForTimeout(4000)
    await page.click('text=CAUSE')
    await page.locator("xpath=//div[@class='x-column-header-inner x-leaf-column-header x-column-header-over']//div[2]").click()
    await page.hover('text=Filters')
    await page.locator('[placeholder="Enter Filter Text..."]').type('Test')
});

Then("I should see the result of applied filter", async function () {
    await page.click('text=Risk Bowtie')
    let val = (await page.locator("xpath=(//div[@class='x-panel-body x-grid-with-col-lines x-grid-with-row-lines x-grid-body x-panel-body-bw-grid-portlet x-panel-body-bw-grid-portlet x-noborder-rl'])[2]").innerText()).valueOf()
    expect(val.toLowerCase()).to.includes('test')
    //await (await page.screenshot({ path: 'Screenshots/RiskFilter.png' }))
})

Then('I should not see the Risk Adviser field', async function () {
    const bufActual = fs.readFileSync("Screenshots\\actual.png");
    const bufExpected = fs.readFileSync("Screenshots\\expected.png");
    //const customConfig = { threshold: 0.5 };
    // expect(bufActual).toMatchImageSnapshot({
    //     failureThreshold: 0.01,
    // failureThresholdType: 'percent',
    //   customDiffConfig: customConfig,
    //   customSnapshotIdentifier: 'customSnapshotName',
    //   noColors: true
    // });
    
    expect(bufActual).to.matchImage(bufExpected)    
});

Then('I should see the result of applied filter of Risk Grouping', async () => {
    await page.waitForTimeout(4000)
    var elements = await page.locator("xpath=//span[@class='pointer']").count()
    for (let i = 0; i < elements; i++) 
    {
        let val = (await page.locator("xpath=//span[@class='pointer']").nth(i).innerText()).valueOf()
        expect(val.toLowerCase()).to.includes('test')
    }
});

Then('I should see edited Risk name in Risk Information section', async function () {
    await page.waitForTimeout(4000)
    let val = (await page.locator("xpath=//span[@data-qtip='Click to edit Risk']").innerText()).valueOf()
    expect(val).to.includes(record.RisknameEdit)
});

Then('New risk should get created', async function () {
    await page.waitForTimeout(4000)
});

Then('I should see the Control details', { timeout: 60 * 1000 }, async function () {
    var text = await page.locator("xpath=//*[contains(text(), 'Admin')]").getAttribute('data-qtip')
    if (text) {
        console.log("Text is present");
    }
    else {
        console.log("Text is not present");
    }
});

}

function AfterScenario() {
    throw new Error("Function not implemented.");
}
