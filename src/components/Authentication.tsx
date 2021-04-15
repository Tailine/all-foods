import Image from 'next/image'
import { ReactNode } from 'react'
import styled from 'styled-components'
import colors from '../styles/themes/colors'
import logo from 'public/images/red-logo.svg'
import { mediaQueries } from '../styles/themes/mediaQueries'
import fonts from 'src/styles/themes/fonts'

type Props = {
  children: ReactNode
  title: string
}

export function Authentication({ children, title }: Props) {
  return (
    <Section>
      <div className="container">
        <LogoSection>
          <Image src={logo} width={74} height={66} />
          <p className="brandName">all foods</p>
        </LogoSection>
        <Title>{title}</Title>
        {children}
      </div>
    </Section>
  )
}

const Section = styled.section`
  height: 100vh;
  width: 100vw;
  background-color: ${colors.red};
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background-color: ${colors.white};
    height: 90%;
    width: 90%;
    padding: 1.5em;

    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;

    ${mediaQueries.sm`
      height: 70%;
      width: 40%;
      padding: 2em;
    `}

    ${mediaQueries.md`
      width: 30%;
    `}

    ${mediaQueries.lg`
      padding: 2em 3em;
    `}
  }
`

const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1em;

  .brandName {
    font-family: ${fonts.sriracha};
    text-transform: uppercase;
    color: ${colors.red};
    font-size: 1.5rem;
    text-align: center;
  }
`

const Title = styled.h2`
  color: ${colors.yellow};
  font-family: ${fonts.sriracha};
  font-weight: normal;
  text-align: center;
`
