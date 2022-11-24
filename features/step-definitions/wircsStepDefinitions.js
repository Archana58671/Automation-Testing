"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const constants_1 = require("../../constants");
const fs = __importStar(require("fs"));
const sync_1 = require("csv-parse/sync");
const path = __importStar(require("path"));
const chai = __importStar(require("chai"));
const chai_image_1 = require("chai-image");
chai.use(chai_image_1.chaiImage);
const playwright = require('playwright');
let browser, context, page;
const records = (0, sync_1.parse)(fs.readFileSync(path.join('C:\\Users\\W58671\\Onedrive - Woodside Energy Ltd\\Desktop\\study\\Playwright Cucumber', 'input.csv')), {
    columns: true,
    skip_empty_lines: true
});
(0, cucumber_1.setDefaultTimeout)(constants_1.constants.timeout);
(0, cucumber_1.BeforeAll)(async () => {
    browser = await playwright.chromium.launch({
        headless: false,
        channel: 'chrome'
    });
    context = await browser.newContext({
        recordVideo: { dir: "./recordings" },
    });
    page = await context.newPage();
});
(0, cucumber_1.AfterStep)(async function () {
    await page.waitForTimeout(2000);
    this.attach(await page.screenshot(), "image/png");
});
for (const record of records) {
    (0, cucumber_1.Given)("I opens Wircs website", { timeout: 60 * 1000 }, async function () {
        await page.goto('http://wircs-test/bwise/login');
    });
    (0, cucumber_1.When)("I Login to Wircs application", async function () {
        await page.locator('#username').fill(record.username);
        await page.locator('#password').fill(record.password);
        await page.locator('select#logindomain').selectOption({ value: 'BWise' });
        await page.locator("xpath=(//input[@class='BWiseButton loginbutton'])[1]").click();
    });
    (0, cucumber_1.When)("I click on Risk tile", async function () {
        await page.locator("xpath=(//div[@class='app_text'])[2]").click();
    });
    (0, cucumber_1.When)("I click on Risk 1148", async function () {
        await page.click('text=Risk 11428');
    });
    (0, cucumber_1.When)('I click on Submit button', { timeout: 90 * 1000 }, async function () {
        await page.click('text=Submit');
        await page.waitForTimeout(5000);
    });
    (0, cucumber_1.When)('I click on Risk Grouping tile', async () => {
        await page.click('text=Risk Grouping');
    });
    (0, cucumber_1.When)('I click on Custom Groups', async () => {
        await page.click('text=Custom Groups');
        await page.waitForTimeout(3000);
    });
    (0, cucumber_1.When)('I Enter text in Filter section of Risk Grouping', async () => {
        await page.locator("xpath=(//span[@class='x-column-header-text-inner'])[4]").click({ force: true });
        await page.locator("xpath=(//div[@class='x-column-header-trigger'])[3]").click();
        await page.hover("xpath=(//span[@class='x-menu-item-text x-menu-item-text-default x-menu-item-indent-no-separator x-menu-item-indent-right-arrow'])[2]");
        await page.locator('[placeholder="Enter Filter Text..."]').type('Test');
        await page.click("(//div[@class='x-splitter bw-dashboard-splitter x-border-item x-box-item x-splitter-default x-splitter-horizontal x-unselectable'])[1]");
    });
    (0, cucumber_1.When)('I click on Reports', async function () {
        await page.click('text=Reports');
    });
    (0, cucumber_1.When)('I Click on side-by-side Report', { timeout: 60 * 2000 }, async function () {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.click('text=Side-by-Side Report')
        ]);
        await newPage.waitForLoadState();
        await page.waitForTimeout(20000);
        await (await newPage.screenshot({ path: 'Screenshots\\expected.png' }));
    });
    (0, cucumber_1.When)('I hover the mouse on Control', { timeout: 60 * 1000 }, async function () {
        await page.hover("xpath=//*[contains(text(), 'Admin')]");
    });
    (0, cucumber_1.When)('I Login to Wircs application as Testuser Risk Adviser', async function () {
        await page.locator('#username').fill(record.username);
        await page.locator('#password').fill(record.password);
        await page.locator('select#logindomain').selectOption({ value: 'BWise' });
        await page.locator("xpath=(//input[@class='BWiseButton loginbutton'])[1]").click();
    });
    (0, cucumber_1.When)('I click on Add button on left side', async function () {
        await page.click("xpath=//span[@class='x-btn-icon-el x-btn-icon-el-action-button-small icon-action_add ']");
    });
    (0, cucumber_1.When)('I Fill the mandatory details with test owner field as Testuser WU', { timeout: 90 * 1000 }, async function () {
        await page.locator("xpath =(//*[@name = 'classRisk_ca_RiskName'])").fill(record.Riskname);
        await page.click("xpath=(//iframe[@title='Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help'])[1]");
        await page.locator('#mceu_11-button').click();
        const locdescription = page.frameLocator("xpath=(//iframe[@title='Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help'])[1]").locator("xpath=//*[@id='tinymce']/ol/li");
        await locdescription.fill('comments123');
        await page.locator("xpath=(//input[@name='classRisk_owner'])").fill('');
        await page.locator("xpath=(//input[@name='classRisk_owner'])").fill('Testuser W');
        await page.click('text =Testuser WU');
        await page.locator("xpath=//div[@id='bwise-searchableDropdownfield-1323-trigger-picker']").click();
        await page.locator("xpath=//div[@data-recordindex='4']").click();
    });
    (0, cucumber_1.When)('I Login to Wircs application as Testuser WU', async function () {
        await page.locator('#username').fill(record.username2);
        await page.locator('#password').fill(record.password);
        await page.locator('select#logindomain').selectOption({ value: 'BWise' });
        await page.locator("xpath=(//input[@class='BWiseButton loginbutton'])[1]").click();
    });
    (0, cucumber_1.When)('I search and click on the newly created risk', async function () {
        await page.locator('[placeholder="Search Risk Name"]').click();
        await page.locator('[placeholder="Search Risk Name"]').type(record.Riskname);
        await page.keyboard.press('Enter');
        await page.click("text=Risk421");
    });
    (0, cucumber_1.When)('I click on the Risk name in Risk Information section', async function () {
        await page.locator("xpath=//span[@data-qtip='Click to edit Risk']").click();
    });
    (0, cucumber_1.When)('I Edit the Risk name', async function () {
        await page.locator("xpath=(//input[@class='x-form-field x-form-text x-form-text-default '])[2]").fill(record.RisknameEdit);
    });
    (0, cucumber_1.When)("I Enter text in Filter section", { timeout: 60 * 1000 }, async function () {
        await page.waitForTimeout(4000);
        await page.click('text=CAUSE');
        await page.locator("xpath=//div[@class='x-column-header-inner x-leaf-column-header x-column-header-over']//div[2]").click();
        await page.hover('text=Filters');
        await page.locator('[placeholder="Enter Filter Text..."]').type('Test');
    });
    (0, cucumber_1.Then)("I should see the result of applied filter", async function () {
        await page.click('text=Risk Bowtie');
        let val = (await page.locator("xpath=(//div[@class='x-panel-body x-grid-with-col-lines x-grid-with-row-lines x-grid-body x-panel-body-bw-grid-portlet x-panel-body-bw-grid-portlet x-noborder-rl'])[2]").innerText()).valueOf();
        (0, chai_1.expect)(val.toLowerCase()).to.includes('test');
    });
    (0, cucumber_1.Then)('I should not see the Risk Adviser field', async function () {
        const bufActual = fs.readFileSync("Screenshots\\actual.png");
        const bufExpected = fs.readFileSync("Screenshots\\expected.png");
        (0, chai_1.expect)(bufActual).to.matchImage(bufExpected);
    });
    (0, cucumber_1.Then)('I should see the result of applied filter of Risk Grouping', async () => {
        await page.waitForTimeout(4000);
        var elements = await page.locator("xpath=//span[@class='pointer']").count();
        for (let i = 0; i < elements; i++) {
            let val = (await page.locator("xpath=//span[@class='pointer']").nth(i).innerText()).valueOf();
            (0, chai_1.expect)(val.toLowerCase()).to.includes('test');
        }
    });
    (0, cucumber_1.Then)('I should see edited Risk name in Risk Information section', async function () {
        await page.waitForTimeout(4000);
        let val = (await page.locator("xpath=//span[@data-qtip='Click to edit Risk']").innerText()).valueOf();
        (0, chai_1.expect)(val).to.includes(record.RisknameEdit);
    });
    (0, cucumber_1.Then)('New risk should get created', async function () {
        await page.waitForTimeout(4000);
    });
    (0, cucumber_1.Then)('I should see the Control details', { timeout: 60 * 1000 }, async function () {
        var text = await page.locator("xpath=//*[contains(text(), 'Admin')]").getAttribute('data-qtip');
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
