import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    .content {
      padding: 2em;
      height: calc(100vh - 71px);
      overflow-y: scroll;
    }

    @media (min-width: ${theme.breakpoints.md}) {
      display: grid;
      grid-template-columns: 250px auto;

      .content {
        height: 100vh;
      }
    }
  `}
`
