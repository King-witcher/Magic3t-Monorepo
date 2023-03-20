import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import * as SessionService from '../services/sessionService'


interface IProps {
  children: ReactNode
}

interface ILoginParams {
  username: string
  password: string
}

interface UserData {
  nickname: string
}

interface ISessionContextData {
  login(params: ILoginParams): Promise<void>
  logout(): Promise<void>
  isLogged: boolean
  isLoading: boolean
  error: string | null
  userData: UserData | null
}

const SessionContext = createContext<ISessionContextData>({} as ISessionContextData)

export const SessionContextProvider = ({ children }: IProps) => {

  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Verifica a sessão relacionada ao token atual.
  useEffect(() => {
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
          setIsLogged(true)
          setUserData({
            nickname: response.userData.nickname
          })
        }
      })
    }
  }, [])

  // Sincroniza o token do localStorage com o estado
  useEffect(() => {
    if (token)
      localStorage.setItem('token', token)
    else
      localStorage.removeItem('token')
  }, [token])

  async function login({ username, password }: ILoginParams) {
    if (isLogged) {
      return setError(`Mas vc ja ta logado como ${userData?.nickname} mano`)
    }

    setIsLoading(true)
    const dat = await SessionService.login({ username, password })
    setIsLoading(false)
    if (dat.success) {
      setIsLogged(true)
      setToken(dat.token)
      setError(null)
      updateUserData(dat.token)
    } else {
      setError('Não foi possível iniciar sessão.')
    }
  }

  async function updateUserData(token: string | undefined) {
    if (!token) {
      setUserData(null)
    } else {
      const info = await SessionService.getSessionInfo(token)
      console.log(token)
      console.log(info)
      if (info.status === 'authenticated')
        setUserData(info.userData)
      else
        setUserData(null)
    }
  }

  async function logout() {
    //a
  }

  return (
    <SessionContext.Provider value={{ login, isLogged, logout, userData, isLoading, error }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  return useContext(SessionContext)
}