import { LoginRequest } from '@magic3t/backend'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import * as SessionService from '../services/sessionService'


interface IProps {
  children: ReactNode
}

interface UserData {
  nickname: string
}

export type SessionData = {
  token: null
  isAuthenticated: false
} | {
  token: string
  isAuthenticated: true
  userData: UserData
}

interface ISessionContextData {
  login(params: LoginRequest): Promise<void>
  logout(): Promise<void>
  session: SessionData
  isLoading: boolean
  error: string | null
}

const initialSessionData: SessionData = {
  token: null,
  isAuthenticated: false
}

const SessionContext = createContext<ISessionContextData>({} as ISessionContextData)

export const SessionContextProvider = ({ children }: IProps) => {

  const [session, setSession] = useState<SessionData>(initialSessionData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Verifica a sessão relacionada ao token atual.
  useEffect(() => {
    const token = localStorage.getItem('token')
    // Caso algum token esteja armazenado em localStorage
    if (token) {
      console.log(token)
      // Verifica se o mesmo ainda é válido
      SessionService.getSessionInfo(token).then(response => {
        // Deleta o token caso não seja mais válido
        if (response.status === 'unauthenticated')
          localStorage.removeItem('token')
        // Salva informações do usuário
        else {
          setSession({
            isAuthenticated: true,
            userData: response.userData,
            token,
          })
        }

        setIsLoading(false)
      })
    }
  }, [])

  // Sincroniza o token do localStorage com o estado
  useEffect(() => {
    if (session.token)
      localStorage.setItem('token', session.token)
    else
      localStorage.removeItem('token')
  }, [session.token])

  async function login({ username, password }: LoginRequest) {
    if (session.isAuthenticated) {
      await logout()
    }
    const dat = await SessionService.login({ username, password })
    if (dat.success) {
      await fetchUserData(dat.token)
      setError(null)
    } else {
      setError('Não foi possível iniciar sessão.')
    }
  }

  async function fetchUserData(token: string | undefined) {
    if (!token) {
      setSession({
        isAuthenticated: false,
        token: null,
      })
    } else {
      console.log(token)
      
      const info = await SessionService.getSessionInfo(token)
      console.log(token)
      console.log(info)
      if (info.status === 'authenticated')
        setSession({
          isAuthenticated: true,
          token,
          userData: info.userData,
        })
      else
        setSession({
          isAuthenticated: false,
          token: null,
        })
    }
  }

  async function logout() {
    //a
  }

  return (
    <SessionContext.Provider value={{ login, logout, session, isLoading, error }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  return useContext(SessionContext)
}