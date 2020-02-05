import App from './app'

import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import loggerMiddleware from './middleware/logger'

import PostsController from './controllers/posts/posts.controller'
import HomeController from './controllers/home/home.controller'
import CrawlController from "./controllers/crawl/crawl.controller";


dotenv.config()

const app = new App({
    port: Number(process.env.SERVER_PORT) || 5000,
    controllers: [
        new HomeController(),
        new PostsController(),
        new CrawlController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()

// http://rousseau-alexandre.fr/en/programming/2019/06/19/express-typescript.html
// https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/
// https://www.tutorialsteacher.com/typescript
