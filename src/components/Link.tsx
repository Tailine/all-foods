import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import colors from '../styles/themes/colors'

const StyledLink = styled.a`
  color: ${colors.yellow};
  cursor: pointer;
  font-size: 0.7rem;

  &:hover {
    text-decoration: underline;
  }
`

type Props = {
  path: string
  text: string
}

export function Link({ path, text }: Props) {
  return (
    <NextLink href={path}>
      <StyledLink>{text}</StyledLink>
    </NextLink>
  )
}
