import { get, post } from './server'

interface LoginParams {
  username: string
  password: string
}

type LoginResponse = {
  success: true
  token: string
} | {
  success: false
}

export async function login(params: LoginParams) {
  return await post<LoginResponse>('/login', params)
}

type SessionInfo = {
  status: 'authenticated'
  userData: {
    nickname: string
  }
} | {
  status: 'unauthenticated'
  userData: undefined
}

export async function getSessionInfo(token: string): Promise<SessionInfo> {
  console.log(token)
  return await get<SessionInfo>(`/session?token=${token}`)
}