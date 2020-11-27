import { ChangeEvent, FormEvent, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  ScaleFade,
  Input,
  IconButton,
  Button,
  CircularProgress,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useLoginMutation } from "../../generated/graphql";

import ErrorMessage from "../../components/misc/ErrorMessage";

export default function Login() {
  const [login, { data, loading, error }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    console.log("loading : ", loading);
    try {
      await login({
        variables: {
          input: { email, password },
        },
      });
      console.log("data :", data);
      setShowPassword(false);
    } catch {
      console.log("error :", error);
      // setEmail("");
      // setPassword("");
      setShowPassword(false);
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Flex height="70vh" width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              {error && <ErrorMessage message={error.message} />}
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="test@test.com"
                  size="lg"
                  onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                    setEmail(event.currentTarget.value)
                  }
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    size="lg"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                      setPassword(event.currentTarget.value)
                    }
                  />
                  <InputRightElement h="100%">
                    <IconButton
                      size="sm"
                      fontSize="lg"
                      variant="ghost"
                      color="blue.900"
                      onClick={handlePasswordVisibility}
                      icon={
                        showPassword ? (
                          <ViewOffIcon />
                        ) : (
                          <ViewIcon name="view" />
                        )
                      }
                      aria-label={"Show password"}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                variantcolor="blue.900"
                variant="outline"
                type="submit"
                width="full"
                mt={4}
              >
                {loading ? (
                  <CircularProgress
                    isIndeterminate
                    size="24px"
                    color="blue.900"
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </ScaleFade>
  );
}
