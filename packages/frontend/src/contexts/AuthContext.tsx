import { LoginRequest } from '@magic3t/backend'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { get, post } from '../services/server'
import { SessionService } from '../services/SessionService'


interface IProps {
  children: ReactNode
}

interface UserData {
  nickname: string
  rating: number
}

export type SessionData = {
  token: null
  isAuthenticated: false
} | {
  token: string
  isAuthenticated: true
  sessionData: UserData
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
      SessionService.getSession(token).then(response => {
        // Deleta o token caso não seja mais válido
        if (response.status === 404)
          localStorage.removeItem('token')
        // Salva informações do usuário
        else {
          setSession({
            isAuthenticated: true,
            sessionData: {
              nickname: response.data.nickname,
              rating: response.data.rating
            },
            token,
          })
        }

        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
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
    const response = await SessionService.signIn(username, password)
    if (200 <= response.status && response.status < 300) {
      await fetchUserData(response.data.token)
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
      
      const info = await SessionService.getSession(token)
      if (info.status === 200)
        setSession({
          isAuthenticated: true,
          token,
          sessionData: info.data,
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