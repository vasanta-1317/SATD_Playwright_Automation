import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import Assert from "../../helper/wrapper/assert";
import { fixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";
import * as data from "../../helper/util/test-data/data.json";

setDefaultTimeout(60 * 1000 * 30)

let loginPage: LoginPage;
let assert: Assert;


Given('User navigates to the SATD login page', async function () {
        loginPage = new LoginPage(fixture.page);
        assert = new Assert(fixture.page);
        await loginPage.navigateToLoginPage();
        await fixture.page.waitForLoadState();
        //await fixture.page.waitForNavigation({ waitUntil: 'networkidle'});
      });
    
Given('User click on the login icon', async function () {
        await loginPage.clickSignInButton();
        await fixture.page.waitForLoadState();
        //await fixture.page.waitForNavigation({ waitUntil: 'networkidle'});
        
      });


  When('User enters valid credentials', async function () {
    await assert.assertTitle("Sign In | Dell US");
    await loginPage.enterUserName(data.emailId);
    await loginPage.enterPassword(data.password);    
  });


  When('User clicks on the login button', async function () {
    await loginPage.clickLoginButton();
    await fixture.page.waitForLoadState();
    await fixture.page.waitForTimeout(15000);
  });

  Then('User should be navigated to the SATD home page', async function () {
    await fixture.page.waitForLoadState();
    await assert.assertTitleContains("TechDirect");
    await fixture.page.waitForTimeout(5000);
    //await fixture.page.waitForLoadState(); 
  });

  When('User should click on {string} menu', async function (connectAndMange) {
    await assert.assertTitleContains("TechDirect");
    await loginPage.clickconnectAnsManage(connectAndMange); 
  });

  When('User should click on {string} card', async function (managePCFleet) {
    await loginPage.clickManagePCFleet(managePCFleet);
    await fixture.page.waitForLoadState();
    
  });

  When('User Click Manage card under {string}', async function (manageBtb) {
    await loginPage.clickManageButton(manageBtb);
    await fixture.page.waitForLoadState();
    await fixture.page.waitForTimeout(30000);
    
  });

  When('Switch to iframe name includes {string}', async function (Iframe) {
    await assert.assertTitleContains("Dell Technologies | TechDirect-UAT | Manage your PC fleet");
    //await fixture.page.frameLocator('#ifPPRC').locator("//span[contains(.,' Set up and connect ')]").click();
    await loginPage.switchToIframePSM(Iframe);
    await fixture.page.waitForLoadState();
    await fixture.page.waitForTimeout(10000);
    //await loginPage.switchToIframePSM(Iframe);
  });

  When('User click on left navigation {string} menu', async function (setupAndConnect) {
    await loginPage.clickleftNavigationMenu(setupAndConnect);
    await fixture.page.waitForLoadState();
    await fixture.page.waitForTimeout(10000);
  });

  When('User click on left navigation {string} exapnd icon', async function (menuExapnd) {
    await loginPage.clickleftNavigationExpandIcon(menuExapnd);
    await fixture.page.waitForLoadState();
    await fixture.page.waitForTimeout(10000);
  });

  When('User click on left navigation {string} sub menu', async function (subMenu) {
    //await loginPage.clickSubNavigationMenu(subMenu);
    await loginPage.clickleftNavigationSubMenu(subMenu);
    await fixture.page.waitForLoadState();
    await fixture.page.waitForTimeout(10000);
  });
