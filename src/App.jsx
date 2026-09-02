import './App.css'
import TodosPage from './features/Todos/TodosPage'
import Header from './shared/Header'
import AuthGate from './features/Auth/AuthGate'

 
function App() {

  return (
    <div>
      <Header />
      <AuthGate />
    </div>
  );
}


export default App