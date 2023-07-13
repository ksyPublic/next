'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { initializeAppCheck, ReCaptchaV3Provider } from '.'
import { onAuthStateChanged, getAuth, User } from 'firebase/auth'
import { app } from '.'

const auth = getAuth(app)

export interface AuthContextProps {
  user: User | null
}

export const AuthContext = createContext<AuthContextProps>({ user: null })

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        `${process.env.NEXT_PUBLIC_APP_CHECK_KEY}`
      ),
      isTokenAutoRefreshEnabled: true
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
