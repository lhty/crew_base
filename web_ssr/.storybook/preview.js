import CSSReset from "@chakra-ui/css-reset";
import { ChakraProvider } from "@chakra-ui/react";
import { addDecorator } from "@storybook/react";
import * as React from "react";

export const Chakra = ({ children }) => (
  <ChakraProvider>
    <CSSReset />
    {children}
  </ChakraProvider>
);

addDecorator(StoryFn => (
  <Chakra>
    <StoryFn />
  </Chakra>
));
