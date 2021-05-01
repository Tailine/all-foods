import { useState, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FormField } from 'components/FormField'
import { FormInput } from 'components/FormInput'
import { Heading, ErrorMessage, TextArea, Select } from 'styles/shared'
import styled, { css } from 'styled-components'
import db from 'config/db'
import { Cuisine } from 'helpers/types/api'
import firebase from 'config/firebase'
import { useAuth } from 'hooks/useAuth'
import { Layout } from 'components/Layout'
import { GetServerSidePropsContext } from 'next'
import verifyUserAuthStatus from 'helpers/verifyUserAuthStatus'

type FormData = {
  title: string
  ingredient: string
  otherIngredients?: {
    value: string
  }[]
  link?: string
  method: string
  cuisine: string
  coverImage: FileList
}

export default function NewRecipe() {
  const [cuisines, setCuisines] = useState<Cuisine[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const { user } = useAuth()
  const { register, handleSubmit, errors, control } = useForm<FormData>({
    reValidateMode: 'onSubmit'
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'otherIngredients'
  })

  useEffect(() => {
    async function getCuisines() {
      const cuisinesArr = []

      await db
        .collection('cuisine')
        .get()
        .then((docs) => docs.forEach((doc) => cuisinesArr.push(doc.data())))

      setCuisines(cuisinesArr)
    }
    getCuisines()
  }, [])

  // function getImage() {
  // if(user) {
  //   const storageRef = firebase.storage().ref()
  //   const listRef = storageRef.child('covers/${user.id}')

  //   listRef.listAll().then(res => {
  //     console.log('res', res)
  //     res.items.forEach(item => console.log(item))
  //   })
  // }
  // }

  async function uploadImage(imageFile: File) {
    if (user) {
      const ref = firebase.storage().ref()
      const childRef = ref.child(`covers/${user.uid}/${imageFile.name}`)

      await childRef.put(imageFile)
    }
  }

  async function createRecipe(formValues: FormData, imageName: string) {
    if (user) {
      await db
        .collection('users')
        .doc(user.uid)
        .collection('recipes')
        .add({
          title: formValues.title,
          ingredient: formValues.ingredient,
          otherIngredients: formValues.otherIngredients ?? null,
          link: formValues.link ?? null,
          method: formValues.method,
          cuisine: formValues.cuisine,
          coverImage: imageName
        })
    }
  }

  async function submitForm(values: FormData) {
    const file = values.coverImage.item(0)

    try {
      await uploadImage(file)
      await createRecipe(values, file.name)
    } catch (err) {
      console.error(err)
    }
  }

  function handleImageInput(fileList: FileList) {
    if (fileList) {
      const file = fileList.item(0)
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  return (
    <Layout>
      <Header>
        <Heading>New Recipes</Heading>
        <ButtonSubmit form="createForm" type="submit">
          create
        </ButtonSubmit>
      </Header>
      <Form id="createForm" onSubmit={handleSubmit(submitForm)}>
        <FormField label="Title" htmlFor="title">
          <FormInput
            name="title"
            ref={register({ required: true })}
            placeholder="Ex: Turkey Tetrazzini"
          />
          {errors.title && <ErrorMessage>This field is required</ErrorMessage>}
        </FormField>

        <FormField label="Link" htmlFor="link">
          <FormInput
            name="link"
            ref={register}
            placeholder="Ex: https://www.allrecipes.com/recipes/16817/main..."
          />
        </FormField>

        <FormField label="Image" htmlFor="coverImage">
          <ImageContainer hasImage={!!imageUrl}>
            {imageUrl && <img src={imageUrl} alt="Selected cover image" />}
          </ImageContainer>
          <InputFile
            ref={register({ required: true })}
            onChange={(e) => handleImageInput(e.target.files)}
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/png"
          />
          {errors.coverImage && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </FormField>

        <FormField label="Method" htmlFor="title">
          <TextArea
            name="method"
            ref={register({ required: true })}
            placeholder="Ex: Cut the onion..."
          />
          {errors.method && <ErrorMessage>This field is required</ErrorMessage>}
        </FormField>

        <div>
          <FormField label="Ingredients" htmlFor="ingredient">
            <FormInput
              name="ingredient"
              ref={register({ required: true })}
              placeholder="Ex: Cheese"
            />
            {errors.ingredient && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </FormField>

          <AddButton type="button" onClick={append}>
            add another ingredient
          </AddButton>
          <ul>
            {fields.map((field, index) => (
              <ListItem key={field.id}>
                <FormInput
                  name={`otherIngredients[${index}].name`}
                  ref={register({ required: true })}
                  defaultValue={field.value}
                />
                <ButtonRemove type="button" onClick={() => remove(index)}>
                  <Line />
                </ButtonRemove>
              </ListItem>
            ))}
          </ul>
          {errors.otherIngredients && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </div>

        <FormField label="Cuisine" htmlFor="cuisine">
          <Select
            name="cuisine"
            ref={register({
              required: true,
              validate: (value) => value !== 'none'
            })}
          >
            <option key="none" value="none">
              Select a cuisine
            </option>
            {cuisines.map((cuisine) => (
              <option key={cuisine.id} value={cuisine.id}>
                {cuisine.name}
              </option>
            ))}
          </Select>
          {errors.cuisine && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </FormField>
        <ButtonSubmit type="submit">create</ButtonSubmit>
      </Form>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return verifyUserAuthStatus(context)
}

const Header = styled.header`
  ${({ theme }) => css`
    margin-bottom: 1em;
    button {
      display: none;
    }

    @media (min-width: ${theme.breakpoints.sm}) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: -2em;
      background: ${theme.colors.white};
      padding: 2em 0;

      button {
        display: inline-block;
        width: 10em;
        margin-top: 0;
      }
    }
  `}
`

const centerAbsolutePosition = css`
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`

const Form = styled.form`
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.sm}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2em;

      button[type='submit'] {
        display: none;
      }
    }
  `}
`

const InputFile = styled.input`
  cursor: pointer;
  margin-top: 1em;
`

const ImageContainer = styled.div<{ hasImage: boolean }>`
  ${({ theme, hasImage }) => css`
    border: 2px dashed ${theme.colors.blueishGray};
    border-radius: 4px;
    padding: 1em;
    height: 7em;
    margin: 0 auto;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;

    img {
      overflow: hidden;
    }

    button {
      ${centerAbsolutePosition};
      color: ${hasImage ? theme.colors.white : theme.colors.yellow};
      text-transform: uppercase;
      position: absolute;
      text-align: center;
      background-color: ${hasImage ? theme.colors.yellow : 'transparent'};
    }
  `}
`

const AddButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    color: ${theme.colors.white};
    background-color: ${theme.colors.yellow};
    border-radius: 4px;
    padding: 0.5em;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 1em;
  `}
`

const ListItem = styled.li`
  ${({ theme }) => css`
    list-style: none;
    position: relative;
    padding-left: 0.7em;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5em 0;

    &:before {
      content: '';
      background-color: ${theme.colors.yellow};
      width: 5px;
      height: 5px;
      position: absolute;
      left: 0;
      border-radius: 50%;
      top: 0.7em;
    }
  `}
`

const ButtonRemove = styled.button`
  ${({ theme }) => css`
    border: 0;
    border-radius: 50%;
    background-color: ${theme.colors.yellow};
    padding: 0.8em 0.5em;
    margin-left: 0.5em;
  `}
`

const Line = styled.div`
  ${({ theme }) => css`
    height: 3px;
    width: 1rem;
    background-color: ${theme.colors.white};
  `}
`

const ButtonSubmit = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.red};
    width: 100%;
    margin-top: 1em;
    padding: 1em 0;
  `}
`
