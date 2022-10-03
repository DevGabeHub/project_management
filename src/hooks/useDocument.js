import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { onSnapshot, doc } from 'firebase/firestore'

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState('')
  const [error, setError] = useState(null)

  //realtime data for document
  useEffect(() => {
    const ref = doc(db, collection, id)
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({
            ...snapshot.data(),
            id: snapshot.id,
          })
          setError(null)
        } else {
          setError('no such document exists')
        }
      },
      (err) => {
        console.log(err.message)
        setError('failed to get document')
      }
    )

    return () => unsub()
  }, [collection, id])

  return { document, error }
}
