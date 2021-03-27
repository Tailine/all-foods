import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import firebase from "config/firebase"
interface ContextType {
  user?: firebase.User
  signUp?(email: string, password: string): void
  signIn?(email: string, password: string): void
  signOut?(): void
  setUser?: Dispatch<SetStateAction<firebase.User>>
}

const AuthContext = createContext<ContextType>({});

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<firebase.User | null>(null);

  async function signUp(email: string, password: string) {
    try {
      const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log("user", credential.user.toJSON());
      localStorage.setItem("user", JSON.stringify(credential.user))
      setUser(credential.user)
    } catch (error) {
      console.error("error", error)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const credential = await firebase.auth().signInWithEmailAndPassword(email, password)
      setUser(credential.user)
    } catch(err) {
      console.error(err)
    }
  }

  const value = {user, signIn, signUp}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}