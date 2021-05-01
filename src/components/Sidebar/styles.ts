import styled, { css } from 'styled-components'

export const Aside = styled.aside`
  ${({ theme }) => css`
    background-color: ${theme.colors.red};
    padding: 0.75em;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1;

    @media (min-width: ${theme.breakpoints.md}) {
      padding: 2em 0;
      height: 100vh;
      position: relative;
    }
  `}
`

export const Logo = styled.div`
  ${({ theme }) => css`
    display: none;
    color: ${theme.colors.lightGray};
    font-family: ${theme.fonts.sriracha};

    @media (min-width: ${theme.breakpoints.md}) {
      text-transform: uppercase;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.2rem;
      margin-bottom: 2em;
    }
  `}
`

export const Nav = styled.nav`
  ${({ theme }) => css`
    height: 100%;

    @media (min-width: ${theme.breakpoints.md}) {
      margin-top: 5em;
    }

    ul {
      height: 100%;
      list-style: none;
      text-transform: capitalize;
      display: flex;
      justify-content: space-around;
      align-items: center;

      @media (min-width: ${theme.breakpoints.md}) {
        padding: 0 1em;
        flex-direction: column;
        justify-content: flex-start;
      }
    }
  `}
`

export const Li = styled.li<{ active: boolean }>`
  ${({ theme, active }) => css`
    display: flex;
    align-items: center;
    background-color: ${active
      ? `rgba(${theme.colors.mediumGray}, .1)`
      : 'transparent'};
    padding: ${active ? '0.3em 0.7em' : 0};
    border-radius: 0.25em;

    flex-direction: column;

    @media (min-width: ${theme.breakpoints.md}) {
      margin-bottom: 1em;
      padding: 0.7em 0 0.7em 2em;
      flex-direction: row;
      align-items: center;
      width: 100%;
    }

    a {
      text-decoration: none;
      color: ${theme.colors.lightGray};
      font-weight: 500;
      font-size: 0.875rem;

      @media (min-width: ${theme.breakpoints.md}) {
        font-size: 1rem;
      }
    }

    img {
      width: 1em;
      height: 1em;
      margin-bottom: 0.3em;

      @media (min-width: ${theme.breakpoints.md}) {
        margin-bottom: 0;
        margin-right: 0.5em;
      }
    }
  `}
`
