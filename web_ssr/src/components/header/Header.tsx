import Link from "next/link";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import ColorModeSwitcher from "../misc/ColorModeSwitcher";
import Logo from "./Logo";
import Breadcrumbs from "./Breadcrumbs";
import { useMeQuery } from "../../generated/graphql";

function Header() {
  const color = useColorModeValue("blue.800", "blue.200");
  const { data } = useMeQuery();

  return (
    <Flex justifyContent="space-between" alignItems="center" color={color}>
      <Flex alignItems="center">
        <Link href="/">
          <a>
            <Logo boxSize={12} cursor="pointer" />
          </a>
        </Link>
        {data?.currentUser && <Breadcrumbs />}
      </Flex>
      <ColorModeSwitcher color={color} />
    </Flex>
  );
}

export default Header;
