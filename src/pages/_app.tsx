import colors from 'styles/themes/colors'
import { defaultTheme } from 'styles/themes/theme'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from '../hooks/useAuth'
import { GlobalStyles } from '../styles/GlobalStyles'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
