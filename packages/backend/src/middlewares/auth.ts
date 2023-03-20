import { NextFunction, Request, Response } from 'express'
import { getSession, refreshSessionTime } from '../states/sessions'

async function auth(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies) {
        return next()
    }
    const token = req.cookies.ssid
    refreshSessionTime(token)
    const session = getSession(token)
    if (session) {
        req.auth = {
            authenticated: true,
            userId: session.userId
        }
    } else {
        req.auth = {
            authenticated: false
        }
    }
    next() 
}

export default auth