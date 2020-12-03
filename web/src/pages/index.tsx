import { Flex, Spinner } from "@chakra-ui/react";
import Router from "next/router";
import { useMeQuery } from "../generated/graphql";
import { UserRole } from "../utils/enums/Role";

const index = () => {
  const { data, error } = useMeQuery();

  if (error) Router.push("/auth");

  if (data?.whoAmI.role === UserRole.ADMIN) Router.push("/dashboard");
  if (data?.whoAmI.role === UserRole.AGENT) Router.push("/company");
  if (data?.whoAmI.role === UserRole.USER) Router.push("/client");
  if (data?.whoAmI.role === UserRole.GUEST) Router.push("/auth/activate");

  return (
    <Flex height="70vh" width="full" align="center" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default index;
