import { v4 } from 'uuid'

interface Session {
  userId: string
  expires: number
}

const SESSION_DURATION = parseInt(process.env.SESSION_DURATION || '1000000')
const SESSION_SWEEP_TIME = 1000
const DEBUG_INTERVAL = parseInt(process.env.SESSION_DEBUG_INTERVAL || '1800000')

const sessions: {[token: string]: Session} = {}

setInterval(function sweepSessions() {
  Object.keys(sessions).forEach(token => {
    if (sessions[token].expires < Date.now())
      deleteSession(token)
  })
}, SESSION_SWEEP_TIME)

if (process.env.DEBUG === 'true')
  setInterval(() => {
    console.log(sessions)
  }, DEBUG_INTERVAL)

export function refreshSessionTime(token: string) {
  if (sessions[token])
    sessions[token].expires = Date.now() + SESSION_DURATION
}

export function createSession(userId: string): string {
  const token = v4()
  sessions[token] = {
    userId,
    expires: Date.now() + SESSION_DURATION
  }
  return token
}

// Suboptimal
export function deleteAllSessions(userId: string): void {
  Object.keys(sessions).forEach(token => {
    if (sessions[token].userId === userId)
      deleteSession(token)
  })
}

export function getSession(token: string): Session | null {
  return sessions[token] || null
}

export function deleteSession(token: string) {
  delete sessions[token]
}