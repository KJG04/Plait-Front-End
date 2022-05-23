import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../src/utils/theme";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../src/utils/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <Toaster position="top-center" />
        </ThemeProvider>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
