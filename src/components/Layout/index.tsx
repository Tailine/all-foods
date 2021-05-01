import { Sidebar } from 'components/Sidebar'
import { ReactNode } from 'react'
import * as S from './styles'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
}
export function Layout({ children }: Props) {
  const router = useRouter()
  const [, path] = router.pathname.split('/')

  return (
    <S.Wrapper>
      <Sidebar currentPathName={path} />
      <div className="content">{children}</div>
    </S.Wrapper>
  )
}
