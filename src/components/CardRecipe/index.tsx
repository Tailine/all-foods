import * as S from './styles'

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
      </S.ImageArea>
      <S.Content>
        <div className="titleArea">
          <h2>{title}</h2>
          <button>edit</button>
        </div>
        <p>{cuisine}</p>
      </S.Content>
    </S.Wrapper>
  )
}
