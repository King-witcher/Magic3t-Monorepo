import { get, post } from './server'
import { SessionInfoResponse } from '@magic3t/backend'
import { SessionController } from '@magic3t/nest/src/controllers/session/session.controller'

type LoginResponse = ReturnType<SessionController['login']>
type LoginRequest = Parameters<SessionController['login']>[0]

export async function login(params: LoginRequest) {
  return await post<LoginResponse>('/login', params)
}

export async function getSessionInfo(token: string): Promise<SessionInfoResponse> {
  console.log(token)
  return await get<SessionInfoResponse>(`/session?token=${token}`)
}