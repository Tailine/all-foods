import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormField } from 'src/components/FormField';
import { FormInput } from 'src/components/FormInput';
import PrivatePage from 'src/components/PrivatePage';
import { Heading, ErrorMessage, Input, TextArea } from 'src/styles/shared';
import styled, { css } from 'styled-components';
import plus from 'public/images/plus.svg'
import db from 'config/db';
import { Cuisine } from 'src/helpers/types/api';
import firebase from 'config/firebase'

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
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const { register, handleSubmit, setValue, getValues, errors, control } = useForm<FormData>({
    reValidateMode: 'onSubmit'
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'otherIngredients'
  })

  useEffect(() => {
    (async () => {
      const cuisinesArr = []

      await db.collection('cuisine').get()
      .then(docs => docs.forEach(doc => cuisinesArr.push(doc.data())))

      setCuisines(cuisinesArr)
    })()
  }, [])

  // function getImage() {
  //   const storageRef = firebase.storage().ref()
  //   const listRef = storageRef.child('images/')

  //   listRef.listAll().then(res => {
  //     console.log('res', res)
  //     res.items.forEach(item => console.log(item))
  //   })
  // }
  
  async function uploadImage(imageFile: File) {
    const ref = firebase.storage().ref()
    const childRef = ref.child(`covers/${imageFile.name}`)

    await childRef.put(imageFile)
  }

  async function createRecipe(formValues: FormData, imageName: string) {

    db.collection('recipes').add({
      title: formValues.title,
      ingredient: formValues.ingredient,
      otherIngredients: formValues.otherIngredients ?? null,
      link: formValues.link ?? null,
      method: formValues.method,
      cuisine: formValues.cuisine,
      coverImage: imageName
    })
  }
  
  async function submitForm(values: FormData) {
    const file = values.coverImage.item(0)

    try {
      await uploadImage(file)
      await createRecipe(values, file.name)
    } catch(err) {
      console.error(err)
    }
  }

  function handleImageInput(fileList: FileList) {
    if(fileList) {
      const file = fileList.item(0);
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const selectImageMsg = `${imageUrl ? 'update' : 'select'} cover image`

  return (
    <PrivatePage>
      <section>
        <Heading>New Recipes</Heading>
        <form onSubmit={handleSubmit(submitForm)}>
          <FormField label="Title" htmlFor="title">
            <FormInput name="title" ref={register({ required: true })} placeholder="Ex: Turkey Tetrazzini" />
          </FormField>
          {errors.title && <ErrorMessage>This field is required</ErrorMessage>}

          <FormField label="Ingredients" htmlFor="ingredient">
            <FormInput name="ingredient" ref={register({ required: true })} placeholder="Ex: Cheese" />
          </FormField>
          {errors.ingredient && <ErrorMessage>This field is required</ErrorMessage>}
          
          <AddButton type='button' onClick={append}>
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
                <ButtonRemove type='button' onClick={() => remove(index)}>
                  <Line />
                </ButtonRemove>
              </ListItem>
            ))}
          </ul>
          {errors.otherIngredients && <ErrorMessage>This field is required</ErrorMessage>}

          <FormField label="Link" htmlFor="link">
            <FormInput name="link" ref={register} placeholder="Ex: https://www.allrecipes.com/recipes/16817/main..." />
          </FormField>

          <FormField label="Method" htmlFor="title">
            <TextArea name="method" ref={register({ required: true })} placeholder="Ex: Cut the onion..." rows={5} />
          </FormField>
          {errors.method && <ErrorMessage>This field is required</ErrorMessage>}

          <FormField label='Image' htmlFor='coverImage'>
            <ImageContainer hasImage={!!imageUrl}>
              <button>{selectImageMsg}</button>
              <input ref={register({ required: true })} onChange={(e) => handleImageInput(e.target.files)} type='file' id='coverImage' name='coverImage' accept='image/png' />
              {imageUrl && <img src={imageUrl} alt='Selected cover image' />}
            </ImageContainer>
          </FormField>

          <FormField label="Cuisine" htmlFor="cuisine">
            <select name="cuisine" ref={register({ required: true, validate: value => value !== 'none' })} placeholder="">
              <option key='none' value='none'>Select a cuisine</option>
              {cuisines.map(cuisine => <option key={cuisine.id} value={cuisine.id} >{cuisine.name}</option>)}
            </select>
          </FormField>
          
          <ButtonSubmit type='submit'>create</ButtonSubmit>
        </form>
      </section>  
    </PrivatePage>
  )
}

const centerAbsolutePosition = css`
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`
const ImageContainer = styled.div<{hasImage: boolean}>`
  ${({ theme, hasImage }) => css`
    border: 2px dashed ${theme.colors.blueishGray};
    border-radius: 4px;
    padding: 1em;
    height: 100px;
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

    input[type='file'] {
      opacity: 0;
      position: absolute;
      cursor: pointer;
      ${centerAbsolutePosition};
    }
  `}
`

const AddButton = styled.button`
  ${({theme}) => css`
    width: 100%;
    color: ${theme.colors.white};
    background-color: ${theme.colors.yellow};
    border-radius: 4px;
    padding: .5em;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 1em;
  `}
`

const ListItem = styled.li`
  ${({ theme }) => css`  
    list-style: none;
    position: relative;
    padding-left: .7em;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .5em 0;

    &:before {
      content: '';
      background-color: ${theme.colors.yellow};
      width: 5px;
      height: 5px;
      position: absolute;
      left: 0;
      border-radius: 50%;
      top: .7em;
    }
  `}
`

const ButtonRemove = styled.button`
  ${({ theme }) => css`
    border: 0;
    border-radius: 50%;
    background-color: ${theme.colors.yellow};
    padding: .8em .5em;
    margin-left: .5em;
  `}
`
 
const StyledInput = styled.input`
  display: none;
`

const Line = styled.div`
  ${({ theme }) => css`
    height: 3px;
    width: 1rem;
    background-color: ${theme.colors.white};
  `}
`

const ButtonSubmit = styled.button`
  ${({ theme })=> css`
    background-color: ${theme.colors.red};
    width: 100%;
    margin-top: 1em;
    padding: 1em 0;
  `}
`