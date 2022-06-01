import "../styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../src/utils/theme";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import apolloClient from "@utils/apolloClient";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <Toaster position="top-center" />
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
