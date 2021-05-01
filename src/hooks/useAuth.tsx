import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import firebase from '../../config/firebase'
import nookies from 'nookies'
import { useRouter } from 'next/router'

interface ContextType {
  user: firebase.User
  signUp(email: string, password: string): void
  signIn(email: string, password: string): void
  signOut(): void
  setUser: Dispatch<SetStateAction<firebase.User>>
}

const AuthContext = createContext<ContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<firebase.User | null>(null)
  const router = useRouter()

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        nookies.set(undefined, 'token', token)
        setUser(user)
      } else {
        nookies.set(undefined, 'token', '')
        setUser(null)
      }
    })
  }, [])

  async function signUp(email: string, password: string) {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.error(err)
    }
  }

  async function signOut() {
    try {
      await firebase.auth().signOut()
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  const value = { user, signIn, signUp, signOut, setUser }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
