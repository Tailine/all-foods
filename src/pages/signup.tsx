import { Authentication } from 'src/components/Authentication'
import { AuthenticationForm } from 'src/components/AuthenticationForm'
import { useAuth } from 'src/hooks/useAuth'
import { AuthFormFields } from 'src/helpers/types/interface'
import { Link } from 'src/components/Link'
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
