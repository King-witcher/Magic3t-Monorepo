import Express from 'express'
import morgan from 'morgan'
import DotEnv from 'dotenv'
import cors from 'cors'
DotEnv.config()

import Routes from './routes'
import './models/Model'
import auth from './middlewares/auth'
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 3000
main()

async function main() {
  Express()
    .use(Express.json({limit: '1000kb'}))
    .use(Express.urlencoded())
    .use(cookieParser())
    .use(cors())
    .use(morgan('dev'))
    .use(auth)
    .use(Routes)
  
    .listen(port, () => {console.log(`Server started on port ${port}.`)})
}