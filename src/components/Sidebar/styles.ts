import styled from 'styled-components'
import colors from 'src/styles/themes/colors'
import fonts from 'src/styles/themes/fonts'
import { mediaQueries } from 'src/styles/themes/mediaQueries'

export const Aside = styled.aside`
  background-color: ${colors.red};
  padding: 0.75em;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;

  ${mediaQueries.md`
    padding: 2em 0;
    height: 100vh;
    position: relative;
  `}
`

export const Logo = styled.div`
  display: none;
  color: ${colors.lightGray};
  font-family: ${fonts.sriracha};

  ${mediaQueries.md`
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
    margin-bottom: 2em;
  `}
`

export const Nav = styled.nav`
  height: 100%;

  ${mediaQueries.md`
    margin-top: 5em;
  `}

  ul {
    height: 100%;
    list-style: none;
    text-transform: capitalize;
    display: flex;
    justify-content: space-around;
    align-items: center;

    ${mediaQueries.md`
      padding: 0 1em;
      flex-direction: column;
      justify-content: flex-start;
    `}
  }
`

export const Li = styled.li<{ active: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.active ? `rgba(${colors.mediumGray}, .1)` : 'transparent'};
  padding: ${(props) => (props.active ? '0.3em 0.7em' : 0)};
  border-radius: 0.25em;

  flex-direction: column;

  ${mediaQueries.md`
    margin-bottom: 1em;
    padding: .7em 0 .7em 2em;
    flex-direction: row;
    align-items: center;
    width: 100%;
  `}

  a {
    text-decoration: none;
    color: ${colors.lightGray};
    font-weight: 500;
    font-size: 0.875rem;

    ${mediaQueries.md`
      font-size: 1rem;
    `}
  }

  img {
    width: 1em;
    height: 1em;
    margin-bottom: 0.3em;

    ${mediaQueries.md`
      margin-bottom: 0;
      margin-right: .5em;
    `}
  }
`
