import { ChangeEvent, FormEvent, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  ScaleFade,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { userLogin } from "../utils/mockApi";
import ErrorMessage from "../components/misc/ErrorMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await userLogin({ email, password });
      setIsLoggedIn(true);
      setIsLoading(false);
      setShowPassword(false);
    } catch (error) {
      setError("Invalid username or password");
      setIsLoading(false);
      setEmail("");
      setPassword("");
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
          {isLoggedIn ? (
            <Box textAlign="center">
              <Text>{email} logged in!</Text>
              <Button
                variantcolor="orange"
                variant="outline"
                width="full"
                mt={4}
                onClick={() => setIsLoggedIn(false)}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <>
              <Box textAlign="center">
                <Heading>Login</Heading>
              </Box>
              <Box my={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  {error && <ErrorMessage message={error} />}
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
                        onChange={(
                          event: ChangeEvent<HTMLInputElement>
                        ): void => setPassword(event.currentTarget.value)}
                      />
                      <InputRightElement h="100%">
                        <Button size="sm" onClick={handlePasswordVisibility}>
                          {showPassword ? (
                            <ViewOffIcon />
                          ) : (
                            <ViewIcon name="view" />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    variantcolor="teal"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={4}
                  >
                    {isLoading ? (
                      <CircularProgress
                        isIndeterminate
                        size="24px"
                        color="teal"
                      />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Box>
            </>
          )}
        </Box>
      </Flex>
    </ScaleFade>
  );
}
