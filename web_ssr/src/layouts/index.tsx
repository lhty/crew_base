import React, { useState, ReactElement } from "react";
import { ChakraProvider, Progress } from "@chakra-ui/react";
import { config } from "../styles/config";
import Router from "next/router";
import Header from "../components/header/Header";

interface Props {
  children?: ReactElement;
}

const index = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  if (typeof window !== "undefined") {
    Router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      setIsLoading(false);
    });
  }

  return (
    <ChakraProvider theme={config}>
      {isLoading && (
        <Progress
          size="xs"
          position="absolute"
          width="100%"
          bgColor="#edf2f700"
          isIndeterminate
        />
      )}
      <Header />
      {children}
    </ChakraProvider>
  );
};

export default index;
