import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'interfaces/IControllerBase.interface'
import { validator as v } from '../../utils'
import * as puppeteer from 'puppeteer'


async function runSpider(url) {
    try {
        const browser = await puppeteer.launch({ headless: true })
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


class CrawlController implements IControllerBase {
    public path = '/crawl'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.index)
    }

    index = async (req: Request, res: Response) => {
        if(!v.isValidURL(req.query.url)) {
            const info = {
                message: `Type a url </crawl?url=https://yahoo.com> to get all HTML content`,
                hint: `A valid url is required`,
                ts: new Date().toISOString()
            }
            res.status(400)
            return res.json(info)
        }

        const result = await runSpider(req.query.url)

        return res.json({
            target: req.query.url,
            ...result,
            ts: new Date().toISOString(),
        })
    }
}

export default CrawlController



// const puppeteer = require('puppeteer');
// const url = 'https://www.reddit.com';
//
// export function crawl(start_url: String) {
//     return puppeteer
//         .launch()
//         .then(function(browser) {
//             return browser.newPage();
//         })
//         .then(function(page) {
//             return page.goto(url).then(function() {
//                 return page.content();
//             });
//         })
//         .then(function(html) {
//             console.log(html);
//         })
//         .catch(function(err) {
//             //handle error
//         });
// }
