import { useState } from 'react'
import Input from '../../components/Input'
import { useSessionContext } from '../../contexts/AuthContext'
import { ErrorLabel, LoginContainer, Title } from './styles'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blockFields, setBlockFields] = useState(false)

  const { login, isLoading, error, session } = useSessionContext()

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    setBlockFields(true)
    e.preventDefault()
    await login({ username, password })
    setBlockFields(false)
  }

  if (isLoading) return null

  return (
    <LoginContainer>
      {!session.isAuthenticated
        ? <>
          <Title>
          Iniciar sessão
          </Title>
          <form action="" onSubmit={handleSubmit}>
            <Input label='Nome de usuário' value={username} onChange={handleUsernameChange} disabled={blockFields} />
            <Input label='Senha' value={password} onChange={handlePasswordChange} password disabled={blockFields} />
            <ErrorLabel>{error}</ErrorLabel>
            <input type="submit" value="Entrar" disabled={blockFields} />
          </form>
        </>
        : <>
          <Title>
            Olá, {session.userData.nickname}!
          </Title>
          Esta página ainda não faz nada, apenas mostra que você está logado. Boa sorte tentando se deslogar agora.
        </>
      }
    </LoginContainer>
  )}
 
export default LoginPage