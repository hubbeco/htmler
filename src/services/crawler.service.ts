import * as puppeteer from 'puppeteer'


function getChromiumConfiguration() {
    const config = { headless: true }
    if (process.env.CHROMIUM_EXECUTABLE_PATH) {
        config['executablePath'] = process.env.CHROMIUM_EXECUTABLE_PATH
    }

    return config
}

export default class CrawlerService {
    static config = getChromiumConfiguration()

    static async crawl(url: String) {
        try {
            const browser = await puppeteer.launch(this.config)
            const page = await browser.newPage()
            await page.goto(url)

            const htmlContent = await page.content()
            const hrefs = await page.$$eval('a', as => as.map(a => a.href));
            const outLinks = Array.from(new Set(hrefs))

            await browser.close()

            return { outLinks, htmlContent }

        } catch (err) {
            console.log(err)
        }
    }

}
