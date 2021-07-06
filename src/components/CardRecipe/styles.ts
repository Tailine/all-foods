import styled, { css } from 'styled-components'

export const Wrapper = styled.div``

export const ImageArea = styled.div``

export const Content = styled.section`
  ${({ theme }) => css`
    .titleArea {
      display: flex;
    }

    h2 {
      color: ${theme.colors.darkestGray};
    }
  `}
`
