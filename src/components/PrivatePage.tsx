import {useRouter} from "next/router"
import { ReactNode } from "react"
import { useAuth } from "src/hooks/useAuth"
import { Sidebar } from 'src/components/Sidebar/Sidebar'
import styled from "styled-components"
interface Props {
  children: ReactNode
}

export default function PrivatePage({ children }: Props) {

  const router = useRouter()
  const {isUserAuthenticated} = useAuth()

  if(!isUserAuthenticated) {
    return <>{router.push('/')}</>
  }

  const [, pathName] = router.pathname.split('/')

  return (
    <Wrapper>
      <Sidebar currentPathName={pathName} />
      <Main>
        {children}
      </Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px auto;
`

const Main = styled.main`
  overflow-y: scroll;
  height: 100vh;
  padding: 1.5em;
`