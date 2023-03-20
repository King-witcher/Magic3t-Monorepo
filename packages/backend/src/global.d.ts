declare namespace Express {
  export interface Request {
    auth?: {
      authenticated: false
    } | {
      authenticated: true
      userId: string
    }
  }
}