import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import firebase from 'config/firebase';

interface AuthContextType {
  user?: firebase.User
  signUp?(email: string, password: string): void
  signIn?(email: string, password: string): void
  signOut?(): void
}

const AuthContext = createContext<AuthContextType>({})

export function AuthProvider(children: {children: ReactNode}) {

  const [user, setUser] = useState<any| null>(null);

  async function signUp(email: string, password: string) {
    try {
      // save token
      // redirecionar para home
      // const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      // console.log("user", credential.user.toJSON());
      // localStorage.setItem("user", JSON.stringify(credential.user));
      // setUser(credential.user);
      setUser("testinho");
    } catch (error) {
      console.error(error)
    }
  }
  
  async function signIn(email: string, password: string) {
    const credential = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("credential", credential.user.toJSON());
  }

  function signOut() {
    // signOut do firebase
    // remover token
  }

  return (
    <AuthContext.Provider value={{signUp, user}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}