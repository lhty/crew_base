import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Center } from "@chakra-ui/react";
import Router from "next/router";
import ProfileCard from "../components/profile/ProfileCard";
import { useMeQuery } from "../generated/graphql";

export default function Index() {
  const { data, loading } = useMeQuery();

  const handleSignIn = () => {
    Router.push("/auth");
  };

  return (
    <Box w="100%" p={4}>
      <Center>
        {data?.currentUser ? (
          <ProfileCard {...{ user: data?.currentUser, loading }} />
        ) : (
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="blue"
            bgColor="blue.800"
            variant="solid"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        )}
      </Center>
    </Box>
  );
}
