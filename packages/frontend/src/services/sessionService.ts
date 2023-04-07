import { get, post } from './server'

class SessionServiceClass {
  async signIn(username: string, password: string) {
    return await post('/session', {
      username, password
    })
  }

  async getSession(token: string) {
    return await get(`/session/${token}`)
  }
}

export const SessionService = new SessionServiceClass()
