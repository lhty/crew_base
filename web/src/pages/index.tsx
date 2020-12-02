import { Flex, Spinner } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";

const index = () => {
  const { data, loading, error } = useMeQuery();

  if (loading)
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

  if (error) Router.push("/auth");

  return (
    <Flex height="70vh" width="full" align="center" justifyContent="center">
      {JSON.stringify(data?.whoAmI, null, 2)}
    </Flex>
  );
};

export default index;
