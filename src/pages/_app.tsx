import {AuthProvider} from "../hooks/useAuth";
import { GlobalStyles } from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </AuthProvider>
  );
}

export default MyApp;
