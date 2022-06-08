import "../styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../src/utils/theme";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import apolloClient from "@utils/apolloClient";
import { QueryClient, QueryClientProvider } from "react-query";
import { MobileCover } from "@components";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  if (
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent,
    )
  ) {
    return (
      <ThemeProvider theme={theme}>
        <MobileCover />
      </ThemeProvider>
    );
  }

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
