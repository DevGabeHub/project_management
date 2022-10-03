import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
//styles
import './Navbar.css'
import Temple from '../assets/temple.svg'

const Navbar = () => {
  const { logout, isLoading } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='Dojo Logo' />
          <span>The Dojo</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              {!isLoading && (
                <button className='btn' onClick={logout}>
                  Logout
                </button>
              )}
              {isLoading && (
                <button className='btn' disabled>
                  Logging out...
                </button>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navbar
