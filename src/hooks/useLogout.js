import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      //update online status
      const { uid } = user
      await updateDoc(doc(db, 'users', uid), {
        online: false,
      })

      //log out the user
      await auth.signOut()

      dispatch({ type: 'LOGOUT' })

      //update state
      if (!isCancelled) {
        setIsLoading(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        console.log(err.message)
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    setIsCancelled(false)
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isLoading }
}
