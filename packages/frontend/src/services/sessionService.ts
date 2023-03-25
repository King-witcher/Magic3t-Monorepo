import { get, post } from './server'
import { LoginRequest, LoginResponse, SessionInfoResponse } from '@magic3t/backend'

export async function login(params: LoginRequest) {
  return await post<LoginResponse>('/login', params)
}

export async function getSessionInfo(token: string): Promise<SessionInfoResponse> {
  console.log(token)
  return await get<SessionInfoResponse>(`/session?token=${token}`)
}