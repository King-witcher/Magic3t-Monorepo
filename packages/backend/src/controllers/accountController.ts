import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { IUser, User } from '../models/User'
import { AccountCreationRequest } from '../types/requests'

export function createUser(username: string, email: string, nickname: string, password: string): IUser {
  return {
    dataVersion: 1,
    username,
    email,
    passwordDigest: bcrypt.hashSync(password, 10),
    nickname,
    rating: 0
  }
}

export async function create(req: Request<object, object, AccountCreationRequest> , res: Response) {
  try {
    const { username, nickname, password, email } = req.body

    const usernameQuery = User.findByField<User, IUser>('username', username)
    const nicknameQuery = User.findByField<User, IUser>('nickname', username)
    const emailQuery = User.findByField<User, IUser>('email', username)
    const [emailResult, nicknameResult, usernameResult] = await Promise.all([emailQuery, nicknameQuery, usernameQuery])

    if (!!emailResult.length || !!nicknameResult.length || !!usernameResult.length)
      return res.status(400).send('user fields are not unique')

    await User.create(username, email, nickname, password)
    console.log(`Create new user: ${nickname}`)
    return res.status(200).send()
  } catch (e) {
    console.error(e)
    return res.status(500).send()
  }
}