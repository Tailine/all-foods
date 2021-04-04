import styled from "styled-components";

export const ErrorMessage = styled.p`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.error};
  margin-top: 0.5em;
`;

export const Heading = styled.h1`
  color: ${props => props.theme.colors.darkestGray};
`

export const Input = styled.input<{ hasError?: boolean }>`
  border-radius: 0.25em;
  width: 100%;
  padding: 0.5em;
  color: ${({theme}) => theme.colors.blueishGray};
  font-size: 0.8rem;
  outline: 0;

  &::placeholder {
    color: ${({theme}) => theme.colors.blueishGray};
    font-size: 0.8em;
  }
`;
