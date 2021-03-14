import { InputProps } from "helpers/types";
import { forwardRef, RefObject } from "react";
import styled from "styled-components";
import { colors } from "styles/themes/colors";

const StyledInput = styled.input<{ hasError?: boolean }>`
  border: ${({ hasError }) =>
    `1px solid ${hasError ? colors.error : colors.blueishGray}`};
  border-radius: 0.25em;
  width: 100%;
  padding: 0.5em;
  color: ${colors.blueishGray};
  font-size: 0.8rem;
  outline: 0;

  &::placeholder {
    color: ${colors.blueishGray};
    font-size: 0.8em;
  }
`;

const Input = forwardRef(
  ({ hasError, ...props }: InputProps, ref: RefObject<HTMLInputElement>) => {
    return <StyledInput hasError={hasError} ref={ref} {...props} />;
  }
);

export { Input };
