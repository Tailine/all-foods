import { useForm } from "react-hook-form";
import { FormField } from "./FormField";
import { Input } from "./Input";
import { InputPassword } from "../components/InputPassword";
import styled from "styled-components";
import { Button } from "./Button";
import { colors } from "src/styles/themes/colors";
import { ReactNode } from "react";
import { AuthFormFields } from "src/utils/types/interface";

type AuthenticationFormProps = {
  buttonText: string
  children: ReactNode
  onSubmit(values: AuthFormFields): void
}

export function AuthenticationForm({onSubmit, children, buttonText}: AuthenticationFormProps) {
  const { register, handleSubmit, errors } = useForm<AuthFormFields>();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <StyledButton>{buttonText}</StyledButton>
      {children}
    </form>
  )
}

const StyledButton = styled(Button)`
  margin-top: 2em;
  width: 100%;
`;

const ErrorMessage = styled.p`
  font-size: 0.7rem;
  color: ${colors.error};
  margin-top: 0.5em;
`;