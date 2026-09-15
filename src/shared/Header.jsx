import { useAuth } from '../contexts/AuthContext'
import Logoff from '../features/Logoff'
import Navigation from './Navigation'

function Header(){

    const { isAuthenticated } = useAuth()


    return (
        <header className="app-header">
            <div className="header-content">
                <h1 className="app-title">Todo List</h1>
                <Navigation />
                {isAuthenticated && <Logoff />}
            </div> 
        </header>
  );
}
  


export default Header;