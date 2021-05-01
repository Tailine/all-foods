import { Authentication } from 'components/Authentication'
import { AuthenticationForm } from 'components/AuthenticationForm'
import { useAuth } from 'hooks/useAuth'
import { AuthFormFields } from 'helpers/types/interface'
import { Link } from 'components/Link'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SignUp() {
  const { user, signUp } = useAuth()
  const router = useRouter()

  async function onSubmit(values: AuthFormFields) {
    signUp?.(values.email, values.password)
  }

  useEffect(() => {
    if (user) {
      router.push('/recipes')
    }
  }, [user])

  return (
    <Authentication title="Create your account">
      <AuthenticationForm buttonText="Sign Up" onSubmit={onSubmit}>
        <Paragraph>
          Already have an account? <Link text="Sign in" path="/" />
        </Paragraph>
      </AuthenticationForm>
    </Authentication>
  )
}

const Paragraph = styled.p`
  text-align: center;
  margin-top: 1em;
  font-size: 0.7rem;
`
