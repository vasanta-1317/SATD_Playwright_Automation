import { setDefaultTimeout } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

//setDefaultTimeout(60 * 1000 * 5)

export default class LoginPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        signInBtn: "#sign-in-link > button > span",
        emailInput: "#SignInModel_EmailAddress",
        passwordInput: "#userPwd_UserInputSecret",
        loginBtn: "#btnSignIn",
        connectAnsManage: "Connect and manage ",
        managePCFleet: " Manage PC fleet "
    }

    async navigateToLoginPage() {
        await this.base.goto(process.env.BASEURL);
        await expect(this.page).toHaveTitle("TechDirect", { timeout: 30000 });
    }

    async clickSignInButton() {
        await this.base.waitAndClick(this.Elements.signInBtn);
    }
    async enterUserName(emailId: string) {
        await this.page.locator(this.Elements.emailInput).fill(emailId);
    }
    async enterPassword(Password: string) {
        await this.page.locator(this.Elements.passwordInput).fill(Password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements.loginBtn);
    }

    async clickconnectAnsManage(connectAnsManage: string) {
        await this.page.getByText(connectAnsManage).click();
    }

    async clickManagePCFleet(managePCFleet: string) {
        await this.page.locator("//*[contains(text(),'" + managePCFleet + "')]").click();
    }

    async clickManageButton(manageBtn: string) {
        await this.page.locator("(//h3[contains(.,'" + manageBtn + "')])/parent::div/following-sibling::*//a").click();
    }


    async switchToIframePSM(iFrame: string) {
        return  this.page.frameLocator(iFrame);
    }


    async clickleftNavigationMenu(setupAndConnect: string) {
        await this.page.frameLocator('#ifPPRC').getByText(setupAndConnect).click();
    }

    async clickleftNavigationExpandIcon(expandMenu: string) {
        switch (expandMenu) {
            case " Settings ":
                await this.page.frameLocator('#ifPPRC').locator("//*[contains(text(),'" + expandMenu + "')]//following::clr-icon[1]").click();
                break;
            case " Manage ":
                await this.page.frameLocator('#ifPPRC').locator("(//div[contains(.,'" + expandMenu + "')][contains(@class,'nav-group')]//following::clr-icon)[1]").click();
                break;
            case " PCs ":
                await this.page.frameLocator('#ifPPRC').locator("(//div[contains(.,'" + expandMenu + "')][contains(@class,'nav-group')]//following::clr-icon)[1]").click();
                break;
            case " Summary ":
                await this.page.frameLocator('#ifPPRC').locator("(//div[contains(.,'" + expandMenu + "')][contains(@class,'nav-group')]//following::clr-icon)[1]").click();
                break;
            default:
        }
    }
    
    async clickleftNavigationSubMenu(subMenu: string) {
        await this.page.frameLocator('#ifPPRC').locator("//*[contains(text(),'" + subMenu + "')]").click();
    }

    async clickSubNavigationMenu(letftNavigationMenus: string) {
        let xpath = "//*[contains(text(),'" + letftNavigationMenus + "')]";
        switch (letftNavigationMenus) {
            case "xpath":
                await this.page.frameLocator('#ifPPRC').getByText(letftNavigationMenus).isVisible();
                await this.page.frameLocator('#ifPPRC').locator(letftNavigationMenus).click();
                break;
            default:
        }
        //await this.page.frameLocator('#ifPPRC').getByRole('link', { name: 'Inventory' }).click();
    }


    async loginUser(user: string, password: string) {
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}

