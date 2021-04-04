import {
  ChakraProvider,
  useColorMode,
  useColorModeValue,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import * as React from "react";

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const nextMode = useColorModeValue("dark", "light");

  return (
    <Flex justify="flex-end" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  );
};

const withChakra = (StoryFn: Function) => (
  <ChakraProvider>
    <div id="story-wrapper" style={{ minHeight: "100vh" }}>
      <ColorModeToggleBar />
      <StoryFn />
    </div>
  </ChakraProvider>
);

export const decorators = [withChakra];
