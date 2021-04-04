import App, { AppProps, AppContext } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

import MainLayout from "../layouts";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return appProps;
};

export default MyApp;
