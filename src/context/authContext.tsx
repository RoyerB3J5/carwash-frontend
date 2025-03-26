import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/fireAuth'
import { signInWithEmailAndPassword,onAuthStateChanged,signOut, User, UserCredential } from 'firebase/auth'
interface AuthContextType {
  userCurrent: User | null;
  login: (user:string, password:string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  getToken: () => Promise<string>
}
const AuthContext = createContext<AuthContextType|undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userCurrent, setUserCurrent] = useState<User|null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async(user)=>{
      setUserCurrent(user)
      setLoading(false)
    })
    return unsubscribe
  },[])
  const getToken = async () => {
    const user = auth.currentUser
    if(!user){
      throw new Error("Usuario no autenticado")
    }
    return await user.getIdToken()
  }

  const login = (user : string,password : string) =>  {return signInWithEmailAndPassword(auth,user,password)}
  const logout = () => {return  signOut(auth)}
  if (loading) { 
    return <div>Cargando...</div>
  }
  return (
    <AuthContext.Provider value={{userCurrent, login, logout, getToken}}>
      {children}
    </AuthContext.Provider>
  )
}
