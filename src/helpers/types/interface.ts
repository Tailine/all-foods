import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref'
> & { hasError?: boolean }

export type AuthFormFields = {
  email: string
  password: string
}

export type Recipe = {
  coverImage: string
  cuisine: string
  ingredients: string[]
  repcipeLink: string
  method: string
  title: string
}
