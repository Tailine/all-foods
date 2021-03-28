import styled from "styled-components"
import colors from '../../styles/themes/colors';
import fonts from 'src/styles/themes/fonts';

export const Aside = styled.aside`
  background-color: ${colors.red};
  height: 100vh;
  padding: 2em 0;
`

export const Logo = styled.div`
  font-family: ${fonts.sriracha};
  color: ${colors.lightGray};
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 2em;
`

export const Ul = styled.ul`
  list-style: none;
  text-transform: capitalize;
  padding: 0 1em;
`

export const Li = styled.li<{active: boolean}>`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  background-color: ${props => props.active ? `rgba(${colors.mediumGray}, .1)` : 'transparent'};
  padding: .5em 0 .5em 2em;
  border-radius: .25em;

  a {
    text-decoration: none;
    color: ${colors.lightGray};
    font-weight: 500;
    font-size: .875rem;
  }

  img {
    width: 1em;
    height: 1em;
    margin-right: .5em;
  }
`