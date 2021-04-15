import styled from 'styled-components'

export const ErrorMessage = styled.p`
  font-size: 0.7rem;
  color: ${(props) => props.theme.colors.error};
  margin-top: 0.5em;
`

export const Heading = styled.h1`
  color: ${(props) => props.theme.colors.darkestGray};
`

export const Input = styled.input`
  border-radius: 0.25em;
  width: 100%;
  padding: 0.5em;
  color: ${({ theme }) => theme.colors.blueishGray};
  font-size: 0.8rem;
  border: ${({ theme }) => `1px solid ${theme.colors.blueishGray}}`};

  &::placeholder {
    color: ${({ theme }) => theme.colors.blueishGray};
    font-size: 0.8em;
  }
`

export const TextArea = styled.textarea`
  border-radius: 0.25em;
  color: ${({ theme }) => theme.colors.blueishGray};
  font-size: 1rem;
  border: ${({ theme }) => `1px solid ${theme.colors.blueishGray}}`};
  resize: none;
  padding: 0.5em;

  &::placeholder {
    color: ${({ theme }) => theme.colors.blueishGray};
    font-size: 0.8em;
  }
`
