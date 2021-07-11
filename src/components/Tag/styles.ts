import styled, { css } from 'styled-components'

export const Wrapper = styled.p`
  ${({ theme }) => css`
    background-color: ${theme.colors.yellow};
    display: inline;
    padding: 0.3rem 0.7rem;
    color: ${theme.colors.white};
    border-radius: 1rem;
    font-size: 0.875rem;
  `}
`
