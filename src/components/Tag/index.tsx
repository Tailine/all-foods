import * as S from './styles'

type TagProps = {
  children: React.ReactNode
}

export function Tag({ children }: TagProps) {
  return <S.Wrapper>{children}</S.Wrapper>
}
