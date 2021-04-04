import { Flex, VStack, Heading, Button } from "@chakra-ui/react";

interface Props {
  handleLogout: (event: any) => Promise<void>;
}

const ActivateForm = ({ handleLogout }: Props) => {
  return (
    <Flex width="full" align="center" justifyContent="center">
      <VStack
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="sm"
        p="1em"
      >
        <Heading>activate</Heading>
        <Button onClick={handleLogout}>logout</Button>
      </VStack>
    </Flex>
  );
};

export default ActivateForm;
