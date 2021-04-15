import { DefaultTheme } from 'styled-components'
import colors from './colors'
import { breakpoints } from './breakpoints'
import fonts from './fonts'

export const defaultTheme: DefaultTheme = {
  colors: {
    ...colors
  },
  breakpoints: {
    ...breakpoints
  },
  fonts: {
    ...fonts
  }
}
