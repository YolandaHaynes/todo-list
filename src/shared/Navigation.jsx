import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const { isAuthenticated } = useAuth();

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: isActive ? 'underline' : 'none',
  });

  return (
    <nav aria-label="Main navigation">
      <ul className="navigation-list"
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '1rem',
          padding: 0,
        }}
      >
        <li>
          <NavLink to="/about" 
            className={({isActive}) => isActive ? 'navigation-link active' : 'navigation-link'}
          >
            About
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/todos" 
              className={({isActive}) => isActive ? 'navigation-link active' : 'navigation-link'}
              >
                Todos
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile"
              className={({isActive}) => isActive ? 'navigation-link active' : 'navigation-link'}
              >
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" 
            className={({isActive}) => isActive ? 'navigation-link active' : 'navigation-link'}
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;