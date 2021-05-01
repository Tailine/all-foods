import styled from 'styled-components'
import { Authentication } from 'components/Authentication'
import { Link } from 'components/Link'
import { useAuth } from 'hooks/useAuth'
import { AuthenticationForm } from 'components/AuthenticationForm'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import firebaseAdmin from 'config/firebaseAdmin'

type FormFields = {
  email: string
  password: string
}

export default function Login() {
  const { user, signIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('recipes')
    }
  }, [user])

  async function onSubmit(values: FormFields) {
    signIn?.(values.email, values.password)
  }

  return (
    <Authentication title="Welcome Back">
      <AuthenticationForm buttonText="Sign In" onSubmit={onSubmit}>
        <Paragraph>
          Don&quot;t have an account? <Link text="Sign up" path="/signup" />
        </Paragraph>
        <Paragraph>
          <Link text="Forgot password" path="" />
        </Paragraph>
      </AuthenticationForm>
    </Authentication>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(context)
    await firebaseAdmin.auth().verifyIdToken(cookies.token)
    return {
      redirect: {
        destination: '/recipes',
        permanent: false
      }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {}
    }
  }
}

const Paragraph = styled.p`
  text-align: center;
  margin-top: 1em;
  font-size: 0.7rem;
`
