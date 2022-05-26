import "../styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../src/utils/theme";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import apolloClient from "@utils/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Toaster position="top-center" />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
