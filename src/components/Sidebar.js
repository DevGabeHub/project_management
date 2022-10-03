import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

//styles & images
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from './Avatar'
const Sidebar = () => {
  const { user } = useAuthContext()
  return (
    <div className='sidebar'>
      <div className='siderbar-content'>
        <div className='user'>
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink to='/' end>
                <img src={DashboardIcon} alt='dashboard' />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <img src={AddIcon} alt='add project icon' />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
