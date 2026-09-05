import './App.css'
import TodosPage from './features/Todos/TodosPage'
import Header from './shared/Header'
import { useAuth } from './contexts/AuthContext.jsx'
import Logon from './features/Logon.jsx'

 
function App() {

  const { isAuthenticated } = useAuth()

  return (
    <div>
      <Header />
      {isAuthenticated ? <TodosPage /> : <Logon />}
    </div>
  );
}


export default App