import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref'
> & { hasError?: boolean }

export interface AuthFormFields {
  email: string
  password: string
}
