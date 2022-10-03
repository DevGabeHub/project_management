import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { updateDoc, doc } from 'firebase/firestore'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      //signing up the user
      const res = await signInWithEmailAndPassword(auth, email, password)

      await updateDoc(doc(db, 'users', res.user.uid), {
        online: true,
      })

      dispatch({ type: 'LOGIN', payload: res.user })

      //update state
      if (!isCancelled) {
        setIsLoading(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    setIsCancelled(false)
    return () => setIsCancelled(true)
  }, [])

  return { login, error, isLoading }
}
