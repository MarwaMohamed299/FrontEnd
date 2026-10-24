import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
export default function NavBar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/auth/login', { replace: true });
  }
  return (
    <div>
      NavBar{token ? 'welcome' : ''}
      {token && (
        <button type="button" onClick={handleLogout} className="ml-4 rounded bg-red-600 px-4 py-2 text-white">
          Logout
        </button>
      )}
    </div>
  )
}
