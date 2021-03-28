import styled from "styled-components";
import { Authentication } from "../components/Authentication";
import { Link } from "../components/Link";
import { useAuth } from 'src/hooks/useAuth';
import { AuthenticationForm } from "src/components/AuthenticationForm";
import { useEffect } from "react";
import { useRouter } from 'next/router';

type FormFields = {
  email: string;
  password: string;
};

export default function Login() {
  const {user, signIn} = useAuth()
  const router = useRouter()

  async function onSubmit(values: FormFields) {
    signIn?.(values.email, values.password)
  }
  
  useEffect(() => {
    if(user) {
      router.push('/recipes')
    }
  }, [user])

  return (
    <Authentication title="Welcome Back">
      <AuthenticationForm buttonText="Sign In" onSubmit={onSubmit}>
        <Paragraph>
          Don't have an account? <Link text="Sign up" path="/signup" />
        </Paragraph>
        <Paragraph>
          <Link text="Forgot password" path="" />
        </Paragraph>
      </AuthenticationForm>
    </Authentication>
  );
}

const Paragraph = styled.p`
  text-align: center;
  margin-top: 1em;
  font-size: 0.7rem;
`;
