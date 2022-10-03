import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage, db } from '../firebase/config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setIsLoading(true)
    setError(null)
    try {
      //signing up the user
      const res = await createUserWithEmailAndPassword(auth, email, password)

      //check if there is a response
      if (!res) {
        throw new Error('Could not sign up the user')
      }

      //upload user thumbnail
      const imageRef = ref(
        storage,
        `thumbnails/${res.user.uid}/${thumbnail.name}`
      )
      await uploadBytes(imageRef, thumbnail)
      const imgURL = await getDownloadURL(ref(storage, imageRef))

      //create a user document
      await setDoc(doc(db, 'users', res.user.uid), {
        online: true,
        displayName,
        photoURL: imgURL,
      })

      //Updating the user profile
      await updateProfile(auth.currentUser, { displayName, photoURL: imgURL })

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

  return { signup, error, isLoading }
}
