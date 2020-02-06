import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'interfaces/IControllerBase.interface'
import { validator as v } from '../../utils'
import CrawlerService from '../../services/crawler.service'


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

        const result = await CrawlerService.crawl(req.query.url)

        return res.json({
            target: req.query.url,
            ...result,
            ts: new Date().toISOString(),
        })
    }
}

export default CrawlController
