export type LoginResponse = {
  success: false
  message: string
  token: null
} | {
  success: true
  message?: string
  token: string
}

export type SessionInfoResponse = {
  status: 'authenticated'
  userData: {
      nickname: string
  }
  message: string
} | {
  status: 'unauthenticated'
  userData: null
  message: string
}