import { NowRequest, NowResponse } from '@now/node'
import puppeteer from 'puppeteer'

import { jsonParser as p } from './utils'
import { validator } from './utils'
// import { crawl } from './spider'


const url = 'https://www.reddit.com';


export default async function(req: NowRequest, res: NowResponse) {

    if(req.query.url === undefined) {
        res.status(400)
        return res.json(p({ error: '"url" parameter is required.' }))

    } else if (!validator.isValidURL(req.query.url)) {
        res.status(400)
        return res.json(p({ error: '"url" parameter must be a valid URL.' }))
    }

    puppeteer
        .launch()
        .then(function(browser) {
            return browser.newPage();
        })
        .then(function(page) {
            return page.goto(url).then(function() {
                return page.content();
            });
        })
        .then(function(html) {
            // console.log(html);
            res.json(p({ url, content: html }))
        })
        .catch(function(err) {
            //handle error
        });

    // return res.json(p({ url }))

}
