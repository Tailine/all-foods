import { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { useAuth } from 'hooks/useAuth'
import { Layout } from 'components/Layout'
import verifyUserAuthStatus from 'helpers/verifyUserAuthStatus'
import db from 'config/db'
import { Recipe as RecipeApi } from 'helpers/types/api'
import { Recipe } from 'helpers/types/interface'
import { CardRecipe } from '../components/CardRecipe/index'
import { getImageFromFirebase } from 'helpers/getImageFromFirebase'

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
    if (userId) {
      const recipesResponse = await db
        .collection('users')
        .doc(userId)
        .collection('recipes')
        .get()
      const userRecipes = await Promise.all(
        recipesResponse.docs.map(async (recipeData) => {
          const {
            link,
            ingredient,
            otherIngridients,
            coverImage,
            ...rest
          } = recipeData.data() as RecipeApi
          const imageUrl = await getImageFromFirebase(userId, coverImage)
          return {
            ...rest,
            repcipeLink: link,
            coverImage: imageUrl,
            ingredients: [
              ingredient,
              ...(otherIngridients ?? []).map(
                (ingredientName) => ingredientName.name
              )
            ]
          }
        })
      )
      setRecipes(userRecipes)
    }
  }

  return (
    <Layout>
      <h1>Recipes</h1>
      {recipes.map((recipe, index) => {
        return (
          <CardRecipe
            key={`${recipe.coverImage}${index}`}
            title={recipe.title}
            cuisine={recipe.cuisine}
            imageSrc={recipe.coverImage}
          />
        )
      })}
      {/* botão temporário */}
      <button onClick={signOut}>Sair</button>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return verifyUserAuthStatus(context)
}
