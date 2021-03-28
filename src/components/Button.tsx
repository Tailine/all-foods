import { ButtonHTMLAttributes, DetailedHTMLProps, RefObject } from "react"
import colors from "src/styles/themes/colors";
import styled from "styled-components";
import fonts from "../styles/themes/fonts"

const StyledButton = styled.button`
  background-color: ${colors.red};
  text-transform: uppercase;
  color: ${colors.white};
  border: 0;
  padding: 1em;
  border-radius: 0.25em;
  font-size: 0.6rem;
  font-family: ${fonts.roboto};
  font-weight: bold;
  cursor: pointer;
`;

export function Button({
  ref,
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return <StyledButton ref={ref as RefObject<HTMLInputElement>} {...rest} />;
}
