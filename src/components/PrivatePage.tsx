import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { Sidebar } from 'src/components/Sidebar/Sidebar'
import styled from 'styled-components'
import { mediaQueries } from '../styles/themes/mediaQueries'
interface Props {
  children: ReactNode
}

export default function PrivatePage({ children }: Props) {
  const router = useRouter()
  const { isUserAuthenticated } = useAuth()

  if (!isUserAuthenticated) {
    return <>{router.push('/')}</>
  }

  const [, pathName] = router.pathname.split('/')

  return (
    <Wrapper>
      <Sidebar currentPathName={pathName} />
      <Main>{children}</Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${mediaQueries.md`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 250px auto;
  `}
`

const Main = styled.main`
  padding: 1.5em;
  overflow-y: scroll;
  position: relative;
  height: calc(100vh - 3.125em);
`
