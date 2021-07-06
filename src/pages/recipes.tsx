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
  const [newRecipes, setNewRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    getRecipes()
  }, [])

  // useEffect(() => {
  //   async function test() {
  //     const initialRecipes: Recipe[] = []

  //     for (const rec of recipes) {
  //       const { link, ingredient, otherIngridients, coverImage, ...rest } = rec

  //       const imagePath = await getImageFromFirebase(userId, coverImage)

  //       initialRecipes.push({
  //         ...rest,
  //         repcipeLink: link,
  //         coverImage: imagePath,
  //         ingredients: [
  //           ingredient,
  //           ...(otherIngridients ?? []).map(
  //             (ingredientName) => ingredientName.name
  //           )
  //         ]
  //       })
  //     }
  //     setNewRecipes(initialRecipes)
  //   }

  //   test()
  // }, [recipes])

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
          <div
            key={`${recipe.coverImage}${index}`}
            style={{ background: 'red', padding: '1em', margin: '1em 0' }}
          >
            <CardRecipe
              key={recipe.coverImage}
              title={recipe.title}
              cuisine={recipe.cuisine}
              imageSrc={recipe.coverImage}
            />
          </div>
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
