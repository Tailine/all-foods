import {useRouter} from "next/router"
import { ReactNode } from "react"
import { useAuth } from "src/hooks/useAuth"
interface Props {
  children: ReactNode
}

export default function PrivatePage({ children }: Props) {

  const router = useRouter()
  const {user} = useAuth()

  if(!user) {
    return <>{router.push('/')}</>
  }

  return (
    <div>
      {children}
    </div>
  )
}