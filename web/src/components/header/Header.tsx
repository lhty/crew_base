import Link from "next/link";
import { Heading, Flex, useToken, Badge } from "@chakra-ui/react";
import ColorModeSwitcher from "../misc/ColorModeSwitcher";

const Header = () => {
  const [blue800, blue500] = useToken("colors", ["blue.800", "blue.500"]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px="1rem"
      py="0.5rem"
      bg={`linear-gradient(to right,${blue800}, ${blue500})`}
      color="white"
    >
      <Flex align="center" mr={3}>
        <Link href="/">
          {/* <Heading cursor="pointer" as="h1" size="lg" letterSpacing={"-.1rem"}>
            CREW_BASE
          </Heading> */}
          <Badge cursor="pointer" fontSize="1.25rem" colorScheme="blue">
            CREW_BASE
          </Badge>
        </Link>
      </Flex>
      <ColorModeSwitcher />
    </Flex>
  );
};

export default Header;
