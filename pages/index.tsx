import Head from "next/head";
import styled from "styled-components";
import { Authentication } from "./components/Authentication";
import { Button } from "./components/Button";
import { FormField } from "./components/FormField";
import { Input } from "./components/Input";
import { InputPassword } from "./components/InputPassword";
import { Link } from "./components/Link";

const Paragraph = styled.p`
  text-align: center;
  margin-top: 1em;
  font-size: 0.7rem;
`;

const StyledButton = styled(Button)`
  margin-top: 2em;
`;

export default function Login() {
  return (
    <section>
      <Head>
        <title>All foods</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Authentication title="Welcome back!">
        <FormField label="Email" htmlFor="email">
          <Input placeholder="Enter your email" />
        </FormField>
        <FormField label="Password" htmlFor="password">
          <InputPassword placeholder="Enter your password" />
        </FormField>
        <StyledButton>Sign In</StyledButton>
        <Paragraph>
          Don't have an account? <Link text="Sign up" path="/singup" />
        </Paragraph>
        <Paragraph>
          <Link text="Forgot password" path="" />
        </Paragraph>
      </Authentication>
    </section>
  );
}
