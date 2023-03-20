import { SessionContextProvider } from './contexts/AuthContext'
import GlobalStyles from './GlobalStyles'
import LoginPage from './pages/Login'

function App() {
  return (
    <SessionContextProvider>
      <GlobalStyles />
      <LoginPage />
    </SessionContextProvider>
  )
}

export default App