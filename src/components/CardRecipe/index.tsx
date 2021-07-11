import { DotsVerticalRounded } from '@styled-icons/boxicons-regular/DotsVerticalRounded'
import { Tag } from 'components/Tag'
import * as S from './styles'
import Link from 'next/link'

type CardRecipeProps = {
  imageSrc: string
  title: string
  cuisine: string
}

export function CardRecipe({ imageSrc, cuisine, title }: CardRecipeProps) {
  // TODO: LAZY LOAD IMAGE
  return (
    <S.Wrapper>
      <S.ImageArea>
        <img src={imageSrc} alt={title} />
        <S.ImageOverlay>
          <Link href="/recipe">
            <a className="link">view recipe</a>
          </Link>
        </S.ImageOverlay>
      </S.ImageArea>
      <S.Content>
        <div className="titleArea">
          <h2>{title}</h2>
          <S.IconWrapper as="button">
            <DotsVerticalRounded color="#B6BCC6" />
          </S.IconWrapper>
        </div>
        <Tag>{cuisine}</Tag>
      </S.Content>
    </S.Wrapper>
  )
}
