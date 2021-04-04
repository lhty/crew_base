import Link from "next/link";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Skeleton,
} from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import Router from "next/router";

function Breadcrumbs(props: any) {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation({
    onCompleted: () => {
      Router.push("/");
    },
  });

  return (
    <Skeleton isLoaded={!loading && !!data}>
      <Menu>
        <MenuButton
          as={Button}
          fontWeight="bold"
          ml="1"
          textTransform="capitalize"
          {...props}
        >
          {data?.currentUser.firstName} {data?.currentUser.lastName}
        </MenuButton>
        <MenuList>
          <MenuGroup title="Profile">
            <MenuItem>
              <Link href="/profile">
                <a>My Account </a>
              </Link>
            </MenuItem>
            <MenuItem>Contracts </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Help">
            <MenuItem>Docs</MenuItem>
            <MenuItem>FAQ</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem
            onClick={() => logout()}
            justifyContent="center"
            fontWeight="bold"
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </Skeleton>
  );
}

export default Breadcrumbs;
