import { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { useAuth } from 'hooks/useAuth'
import { Layout } from 'components/Layout'
import verifyUserAuthStatus from 'helpers/verifyUserAuthStatus'
import db from 'config/db'
import { Recipe as RecipeApi } from 'helpers/types/api'
import { Recipe } from 'helpers/types/interface'

type RecipesProps = {
  userId: string
}

export default function Recipes({ userId }: RecipesProps) {
  const { signOut } = useAuth()
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    getRecipes()
  }, [])

  async function getRecipes() {
    const initialRecipes: Recipe[] = []
    if (userId) {
      db.collection('users')
        .doc(userId)
        .collection('recipes')
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            const {
              link,
              ingredient,
              otherIngridients,
              ...rest
            } = doc.data() as RecipeApi

            initialRecipes.push({
              ...rest,
              repcipeLink: link,
              ingredients: [
                ingredient,
                ...(otherIngridients ?? []).map(
                  (ingredientName) => ingredientName.name
                )
              ]
            })
          })
          setRecipes(initialRecipes)
        })
    }
  }

  return (
    <Layout>
      <h1>Recipes</h1>
      {/* botão temporário */}
      <button onClick={signOut}>Sair</button>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return verifyUserAuthStatus(context)
}
