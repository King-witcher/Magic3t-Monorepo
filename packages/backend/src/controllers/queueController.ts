import { Request, Response } from 'express'
import * as Queue from '../states/queue'

export async function enqueue(req: Request, res: Response) {
  if (!req.auth?.authenticated)
    return res.status(403).send('unauthenticated')

  if (Queue.isEnqueued(req.auth.userId))
    return res.status(400).send('already in queue')

  Queue.enqueue(req.auth.userId)

  return res.status(200).send()
}

export async function checkMatch(req: Request, res: Response) {
  if (!req.auth?.authenticated)
    return res.status(403).send('unauthenticated')
    
  const match = Queue.findMatchFor(req.auth.userId)

  return res.status(200).send({
    oponentId: match
  })
}
