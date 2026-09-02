import { useAuth } from '../../context/AuthContext.jsx'
import TodosPage from '../Todos/TodosPage'
import Logon from '../Logon'

function AuthGate() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <TodosPage /> : <Logon />
}

export default AuthGate