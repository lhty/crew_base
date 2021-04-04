import { Avatar, Badge, Box, Skeleton } from "@chakra-ui/react";
import { User } from "../../generated/graphql";

interface Props {
  user?: User;
  loading: boolean;
}

const ProfileCard = ({ user, loading }: Props) => {
  return (
    <Skeleton isLoaded={!loading}>
      <Box
        maxW="sm"
        borderWidth="1px"
        p="1rem"
        borderRadius="lg"
        overflow="hidden"
      >
        <Avatar
          size="2xl"
          name={user?.firstName + " " + user?.lastName}
          src=""
        />
        <Box
          mt="2"
          fontWeight="semibold"
          fontSize="xl"
          as="h4"
          lineHeight="tight"
          textTransform="capitalize"
          isTruncated
        >
          {user?.firstName + " " + user?.lastName}
        </Box>
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" colorScheme="teal">
            {user?.role}
          </Badge>
        </Box>
      </Box>
    </Skeleton>
  );
};

export default ProfileCard;
