import { extendTheme } from "@chakra-ui/react";

const settings = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

export const config = extendTheme({ settings });
