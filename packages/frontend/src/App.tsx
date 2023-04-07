import { SessionContextProvider } from './contexts/AuthContext'
import GlobalStyles from './GlobalStyles'
import SignInPage from './pages/SignIn'

function App() {
  return (
    <SessionContextProvider>
      <GlobalStyles />
      <SignInPage />
    </SessionContextProvider>
  )
}

export default App