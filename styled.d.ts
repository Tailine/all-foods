import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      yellow: string
      red: string
      blueishGray: string
      white: string
      darkestGray: string
      lightGray: string
      mediumGray: string
      error: string
    }
    breakpoints: {
      xs: string
      sm: string
      md: string
      lg: string
    }
    fonts: {
      roboto: string
      sriracha: string
    }
  }
}
