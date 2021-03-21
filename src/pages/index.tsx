import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Authentication } from "../components/Authentication";
import { Button } from "../components/Button";
import { FormField } from "../components/FormField";
import { Input } from "../components/Input";
import { InputPassword } from "../components/InputPassword";
import { Link } from "../components/Link";
import { colors } from "src/styles/themes/colors";
import { useAuth } from 'src/hooks/useAuth';
import { AuthenticationForm } from "src/components/AuthenticationForm";

type FormFields = {
  email: string;
  password: string;
};

export default function Login() {
  // const { register, handleSubmit, errors } = useForm<FormFields>();
  const {signIn} = useAuth()

  async function onSubmit(values: FormFields) {
    signIn?.(values.email, values.password)
  }

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
    // <Authentication title="Welcome back!">
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <FormField label="Email" htmlFor="email">
    //       <Input
    //         hasError={!!errors.email}
    //         name="email"
    //         ref={register({ required: true })}
    //         placeholder="Enter your email"
    //       />
    //       {errors.email && <ErrorMessage>Provide a valid email</ErrorMessage>}
    //     </FormField>
    //     <FormField label="Password" htmlFor="password">
    //       <InputPassword
    //         hasError={!!errors.password}
    //         name="password"
    //         ref={register({ required: true })}
    //         placeholder="Enter your password"
    //       />
    //       {errors.password && <ErrorMessage>Fill this field</ErrorMessage>}
    //     </FormField>
        // <StyledButton>Sign In</StyledButton>
        // <Paragraph>
        //   Don't have an account? <Link text="Sign up" path="/singup" />
        // </Paragraph>
        // <Paragraph>
        //   <Link text="Forgot password" path="" />
        // </Paragraph>
    //   </form>
    // </Authentication>
  );
}

const Paragraph = styled.p`
  text-align: center;
  margin-top: 1em;
  font-size: 0.7rem;
`;
