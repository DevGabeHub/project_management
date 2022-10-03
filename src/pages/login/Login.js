import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type='email'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type='password'
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isLoading && <button className='btn'>Login</button>}
      {isLoading && (
        <button className='btn' disabled>
          Loading...
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
