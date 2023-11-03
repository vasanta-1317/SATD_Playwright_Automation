import { Page } from "@playwright/test";

export default class PlaywrightWrapper {

    constructor(private page: Page) { }

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

    async waitAndClick(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible"
        });
        await element.click();
    }

    async navigateTo(link: string) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ])
    }

    async waitForText(text: string) {
        await this.page.waitForSelector(`text=${text}`);
    }

    async waitForTextToDisappear(text: string) {
        await this.page.waitForSelector(`text=${text}`, {
            state: "detached"
        });
    }

    async switchToIframe(iframe: string) {
        await this.page.waitForSelector(`iframe[name=${iframe}]`);
    }

}