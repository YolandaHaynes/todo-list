import './App.css'
import TodosPage from './pages/TodosPage.jsx'
import Header from './shared/Header'
import Logon from './features/Logon.jsx'
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RequiredAuth from './features/RequiredAuth.jsx'


 
function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<RequiredAuth><ProfilePage /></RequiredAuth>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}


export default App