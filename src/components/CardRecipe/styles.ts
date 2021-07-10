import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.blueishGray};
    margin: 1.5rem 0;
  `}
`

export const ImageArea = styled.div`
  width: 100%;
  background: purple;
  img {
    width: 100%;
    height: 100%;
  }
`

export const Content = styled.section`
  ${({ theme }) => css`
    padding: 1em;
    .titleArea {
      display: flex;
      justify-content: space-between;
    }

    h2 {
      color: ${theme.colors.darkestGray};
    }
  `}
`

export const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
`
