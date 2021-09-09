import PlausibleProvider from "next-plausible";
import "../styles/globals.css";

interface MyAppProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }:MyAppProps) {
  return (
    <PlausibleProvider domain="robertbrunhage.com">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}

export default MyApp;
