import { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "src/styles/themes/colors";

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;

  label {
    font-size: 0.7rem;
    margin-bottom: 0.5em;
  }
`;

type Props = {
  label: string;
  htmlFor: string;
  children: ReactNode;
};

export function FormField({ label, htmlFor, children }: Props) {
  return (
    <FormFieldContainer>
      <label htmlFor={htmlFor}>{label}:</label>
      {children}
    </FormFieldContainer>
  );
}
