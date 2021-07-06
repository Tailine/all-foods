export type Cuisine = {
  id: string
  name: string
}

export type Recipe = {
  coverImage: any
  cuisine: string
  ingredient: string
  otherIngridients?: { name: string }[]
  link: string
  method: string
  title: string
}
