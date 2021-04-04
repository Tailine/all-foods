import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormField } from 'src/components/FormField';
import { FormInput } from 'src/components/FormInput';
import PrivatePage from 'src/components/PrivatePage';
import { Heading, ErrorMessage, Input } from 'src/styles/shared';
import styled from 'styled-components';

type FormData = {
  title: string
  ingredients: {
    value: string
  }[]
  link?: string
  method: string
  // cuisine: string
  // image: string
}

export default function NewRecipe() {
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { register, handleSubmit, setValue, getValues, errors, control } = useForm<FormData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })

  function addIngredient() {
    const ingredients = getValues()
    
    console.log("ingredients", ingredients)
    console.log("ingredient", newIngredient)
    append({ value: newIngredient })
    // const updatedIngredients = [...ingredients, newIngredient]

    // setValue('ingredients', updatedIngredients)
    // setIngredients(updatedIngredients)
  }

  function submitForm(values: FormData) {
    console.log(values)
  }

  console.log(errors)

  return (
    <PrivatePage>
      <section>
        <Heading>New Recipes</Heading>
        <form onSubmit={handleSubmit(submitForm)}>
          <FormField label="Title" htmlFor="title">
            <FormInput name="title" ref={register({ required: true })} placeholder="Ex: Turkey Tetrazzini" />
          </FormField>
          {errors.title && <ErrorMessage>This field is required</ErrorMessage>}

          <FormField label="Ingredients" htmlFor="ingredients">
            <IngredientsField>
              <FormInput name='ingredients' onChange={({target: {value}}) => setNewIngredient(value)} placeholder="Ex: Cheese" />
              <button onClick={addIngredient}>+</button>
            </IngredientsField>
          </FormField>
          <ul>
            {console.log(fields)}
            {fields.map((field, index) => (
              <li key={field.id}>
                <StyledInput
                  name={`ingredients[${index}].name`}
                  ref={register()}
                  defaultValue={field.value}
                />
                {field.value}
                <button>-</button>
              </li>
            ))}
          </ul>

          <FormField label="Link" htmlFor="link">
            <FormInput name="link" ref={register} placeholder="Ex: https://www.allrecipes.com/recipes/16817/main..." />
          </FormField>

          <FormField label="Method" htmlFor="title">
            <textarea name="method" ref={register({ required: true })} placeholder="Ex: Cut the onion..." />
          </FormField>
          {errors.method && <ErrorMessage>This field is required</ErrorMessage>}
          
          <button>Criar</button>
        </form>

      </section>  
    </PrivatePage>
  )
}

const IngredientsField = styled.div`
  display: flex;

  button {
    border: 0;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.yellow};
    width: 2.5em;
    margin-left: .5em;
  }
`

const StyledInput = styled.input`
  display: none;
`