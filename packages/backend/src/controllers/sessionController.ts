import { Request, Response } from 'express'
import { User } from '../models/User'
import * as Sessions from '../states/sessions'
import { LoginRequest } from '../types/requests'
import { LoginResponse, SessionInfoResponse } from '../types/responses'

export async function login(req: Request<object, object, LoginRequest>, res: Response<LoginResponse>) {
  // Usuário já logado
  if (req.auth?.authenticated)
    return res.status(400).send({
      success: false,
      message: 'already authenticated',
      token: null,
    })

  const { username, password } = req.body

  // Requisição incompleta
  if(!username || !password)
    return res.status(400).send({
      success: false,
      message: 'missing field',
      token: null,
    })

  const userQuery: User[] = await User.findByField('username', username)
  if (userQuery.length === 0)
    return res.status(400).send({
      success: false,
      message: 'username not found',
      token: null,
    })
  
  const user = userQuery[0]

  if (user.checkPassword(password)) {
    const token = Sessions.createSession(user.id)
    res.cookie('ssid', token)
    return res.status(200).send({
      success: true,
      token
    })
  }

  return res.status(403).send({
    success: false,
    message: 'wrong password',
    token: null,
  })
}

export async function getSessionInfo(req: Request, res: Response<SessionInfoResponse>) {
  // Verifica a existência de um header de autorização
  console.log('token', req.query.token)
  const token = req.query.token as string
  if (!token) {
    return res.send({
      status: 'unauthenticated',
      userData: null,
      message: 'no authentication token was found',
    })
  }

  // Verifica se a sessção existe no banco de sessões
  const sessionData = Sessions.getSession(token)
  if (!sessionData) 
    return res.send({
      status: 'unauthenticated',
      userData: null,
      message: 'invalid authentication token',
    })
    
  // Procura pelos dados do usuário
  const user = await User.findById(sessionData.userId) as User
  return res.send({
    status: 'authenticated',
    userData: {
      nickname: user.data.nickname,
    },
    message: '',
  })
}

export async function logout(req: Request, res: Response) {
  return res.status(500)
}