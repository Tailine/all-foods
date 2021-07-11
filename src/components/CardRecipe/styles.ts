import styled, { css } from 'styled-components'
import { breakpoints } from 'styles/themes/breakpoints'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    box-shadow: 1px 1px 3px ${theme.colors.blueishGray};
    margin: 1.5rem 0;
    border-radius: 4px;
  `}
`

export const ImageOverlay = styled.div`
  ${({ theme }) => css`
    background-color: rgba(84, 92, 105, 0.8);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    transition: all 0.3s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;

    .link {
      color: ${theme.colors.lightGray};
      text-transform: uppercase;
      border: 2px solid ${theme.colors.lightGray};
      border-radius: 4px;
      text-decoration: none;
      padding: 0.3rem;
      font-size: 0.875rem;
    }
  `}
`

export const ImageArea = styled.div`
  width: 100%;
  background: purple;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${ImageOverlay} {
      opacity: 1;
    }
  }
`

export const Content = styled.section`
  ${({ theme }) => css`
    padding: 1em;
    .titleArea {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    h2 {
      color: ${theme.colors.darkestGray};
      font-size: 1.2rem;
    }
  `}
`

export const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: transparent;
`
