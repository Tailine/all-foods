import Head from "next/head";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Authentication } from "../components/Authentication";
import { Button } from "../components/Button";
import { FormField } from "../components/FormField";
import { Input } from "../components/Input";
import { InputPassword } from "../components/InputPassword";
import { Link } from "../components/Link";
import { colors } from "src/styles/themes/colors";

type FormFields = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, errors } = useForm<FormFields>();

  async function onSubmit(values: FormFields) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        email: values.email,
        password: values.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Authentication title="Welcome back!">
          <FormField label="Email" htmlFor="email">
            <Input
              hasError={!!errors.email}
              name="email"
              ref={register({ required: true })}
              placeholder="Enter your email"
            />
            {errors.email && <ErrorMessage>Provide a valid email</ErrorMessage>}
          </FormField>
          <FormField label="Password" htmlFor="password">
            <InputPassword
              hasError={!!errors.password}
              name="password"
              ref={register({ required: true })}
              placeholder="Enter your password"
            />
            {errors.password && <ErrorMessage>Fill this field</ErrorMessage>}
          </FormField>
          <StyledButton>Sign In</StyledButton>
          <Paragraph>
            Don't have an account? <Link text="Sign up" path="/singup" />
          </Paragraph>
          <Paragraph>
            <Link text="Forgot password" path="" />
          </Paragraph>
        </Authentication>
      </form>
    </section>
  );
}

const Paragraph = styled.p`
  text-align: center;
  margin-top: 1em;
  font-size: 0.7rem;
`;

const StyledButton = styled(Button)`
  margin-top: 2em;
`;

const ErrorMessage = styled.p`
  font-size: 0.7rem;
  color: ${colors.error};
  margin-top: 0.5em;
`;
