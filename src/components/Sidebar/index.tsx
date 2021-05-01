import * as S from './styles'
import Link from 'next/link'
import cookBook from 'public/images/cook-book.svg'
import recipes from 'public/images/recipes.svg'
import plus from 'public/images/plus.svg'
import { useAuth } from 'hooks/useAuth'

type SidebarProps = {
  currentPathName: string
}

export function Sidebar({ currentPathName = 'recipes' }: SidebarProps) {
  return (
    <S.Aside>
      <S.Logo>
        <img
          alt="image of a cook book with a fork and spoon on the cover"
          src={cookBook}
        />
        <p>all foods</p>
      </S.Logo>
      <S.Nav>
        <ul>
          <S.Li active={currentPathName === 'recipes'}>
            <img src={recipes} alt="image of a fork and knife crossed" />
            <Link href="/recipes">
              <a>recipes</a>
            </Link>
          </S.Li>
          <S.Li active={currentPathName === 'new-recipe'}>
            <img src={plus} alt="plus icon" />
            <Link href="/new-recipe">
              <a>new recipe</a>
            </Link>
          </S.Li>
        </ul>
      </S.Nav>
    </S.Aside>
  )
}
