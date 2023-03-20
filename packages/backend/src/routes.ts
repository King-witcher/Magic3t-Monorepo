import { Router } from 'express'
import * as SesssionController from './controllers/sessionController'
import { create } from './controllers/accountController'
import { enqueue } from './controllers/queueController'

export default Router()
    .post('/login', SesssionController.login)
    .post('/logout', SesssionController.logout)
    .get('/session', SesssionController.getSessionInfo)

    .post('/signin', create)
    .post('/enqueue', enqueue)