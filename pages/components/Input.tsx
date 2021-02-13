import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from "react";
import styled from "styled-components";
import { colors } from "styles/themes/colors";

const StyledInput = styled.input`
  border: 1px solid ${colors.blueishGray};
  border-radius: 0.25em;
  width: 100%;
  padding: 0.5em;
  color: ${colors.blueishGray};

  &::placeholder {
    color: ${colors.blueishGray};
    font-size: 0.8em;
  }
`;

export function Input({
  ref,
  ...rest
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return <StyledInput ref={ref as RefObject<HTMLInputElement>} {...rest} />;
}
