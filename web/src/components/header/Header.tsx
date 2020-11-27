import Link from "next/link";
import { Heading, Flex } from "@chakra-ui/react";
import ColorModeSwitcher from "../misc/ColorModeSwitcher";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="blue.800"
      color="white"
    >
      <Flex align="center" mr={3}>
        <Link href="/">
          <Heading cursor="pointer" as="h1" size="lg" letterSpacing={"-.1rem"}>
            CREW_BASE
          </Heading>
        </Link>
      </Flex>
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Header;
