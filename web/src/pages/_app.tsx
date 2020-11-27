import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/apolloClient";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
}
export default MyApp;
