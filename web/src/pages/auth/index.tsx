import { ChangeEvent, FormEvent, useReducer } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  ScaleFade,
  InputLeftElement,
  Input,
  IconButton,
  Button,
  CircularProgress,
  InputGroup,
  InputRightElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  EmailIcon,
  InfoIcon,
  PhoneIcon,
  UnlockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { useLoginMutation } from "../../generated/graphql";

import ErrorMessage from "../../components/misc/ErrorMessage";

interface Ivalues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  showPassword: boolean;
}

export default function Index() {
  const [login, { data, loading, error }] = useLoginMutation();

  const [values, setValue] = useReducer(
    (values: Ivalues, update: Partial<Ivalues>) => ({
      ...values,
      ...update,
    }),
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      showPassword: false,
    }
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log(event);
    event.preventDefault();
    try {
      await login({
        variables: {
          input: { email: values.email, password: values.password },
        },
      });
    } catch {
      setValue({ email: "", password: "" });
    } finally {
      setValue({ showPassword: false });
    }
  };

  const handlePasswordVisibility = () =>
    setValue({ showPassword: !values.showPassword });

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Flex height="70vh" width="full" align="center" justifyContent="center">
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab width="50%">
              <Box textAlign="center">
                <Heading fontSize={25}>Login</Heading>
              </Box>
            </Tab>
            <Tab width="50%">
              <Box textAlign="center">
                <Heading fontSize={25}>Sign up</Heading>
              </Box>
            </Tab>
          </TabList>
          <TabPanels
            maxWidth="500px"
            borderWidth={1}
            borderRadius={8}
            borderTopRadius={0}
            boxShadow="lg"
          >
            <TabPanel>
              {error && <ErrorMessage message={error.message} />}
              <Box mt={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<EmailIcon color="gray.600" />}
                      />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email"
                        onChange={(
                          event: ChangeEvent<HTMLInputElement>
                        ): void =>
                          setValue({ email: event.currentTarget.value })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired mt={5}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<UnlockIcon color="gray.600" />}
                      />
                      <Input
                        id="password"
                        type={values.showPassword ? "text" : "password"}
                        placeholder="*******"
                        onChange={(
                          event: ChangeEvent<HTMLInputElement>
                        ): void =>
                          setValue({ password: event.currentTarget.value })
                        }
                      />
                      <InputRightElement h="100%">
                        <IconButton
                          size="sm"
                          fontSize="lg"
                          variant="ghost"
                          color="gray.600"
                          onClick={handlePasswordVisibility}
                          icon={
                            values.showPassword ? (
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
                    mt={6}
                    mb={3}
                  >
                    {loading ? (
                      <CircularProgress
                        isIndeterminate
                        size="24px"
                        color="blue.900"
                      />
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>
              </Box>
            </TabPanel>
            <TabPanel>
              {/* #REG */}
              <Box mt={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<InfoIcon color="gray.600" />}
                      />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        onChange={(
                          event: ChangeEvent<HTMLInputElement>
                        ): void =>
                          setValue({ firstName: event.currentTarget.value })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired mt={1}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<InfoIcon color="gray.600" />}
                      />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        onChange={(
                          event: ChangeEvent<HTMLInputElement>
                        ): void =>
                          setValue({ lastName: event.currentTarget.value })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired mt={3}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<PhoneIcon color="gray.600" />}
                      />
                      <Input
                        id="phone"
                        type="phone"
                        placeholder="Phone number"
                        onChange={(
                          event: ChangeEvent<HTMLInputElement>
                        ): void =>
                          setValue({ phone: event.currentTarget.value })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired mt={3}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<EmailIcon color="gray.600" />}
                      />
                      <Input
                        id="singnemail"
                        type="email"
                        placeholder="email"
                        onChange={(
                          event: ChangeEvent<HTMLInputElement>
                        ): void =>
                          setValue({ email: event.currentTarget.value })
                        }
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired mt={1}>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<UnlockIcon color="gray.600" />}
                      />
                      <Input
                        id="singnemailpassword"
                        type={values.showPassword ? "text" : "password"}
                        placeholder="*******"
                        onChange={(
                          event: ChangeEvent<HTMLInputElement>
                        ): void =>
                          setValue({ password: event.currentTarget.value })
                        }
                      />
                      <InputRightElement h="100%">
                        <IconButton
                          size="sm"
                          fontSize="lg"
                          variant="ghost"
                          color="gray.600"
                          onClick={handlePasswordVisibility}
                          icon={
                            values.showPassword ? (
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
                    mt={6}
                    mb={3}
                  >
                    {loading ? (
                      <CircularProgress
                        isIndeterminate
                        size="24px"
                        color="blue.900"
                      />
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </form>
              </Box>
              {/* #REG */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ScaleFade>
  );
}
