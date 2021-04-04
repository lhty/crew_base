import { FormEvent } from "react";
import {
  ScaleFade,
  Flex,
  Tabs,
  TabList,
  Tab,
  Box,
  Heading,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import LoginForm from "../../components/auth/LoginForm";
import SigninForm from "../../components/auth/SigninForm";
import {
  useLoginMutation,
  useCreateUserMutation,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";
import useFormValues from "../../hooks/useFormValues";
import Router from "next/router";
import { UserRole } from "../../lib/enums/Role";
import ActivateForm from "../../components/auth/ActivateForm";

const RedirectHome = () => Router.push("/");

export default function Index() {
  const { data } = useMeQuery();
  const [login, loginData] = useLoginMutation({
    onCompleted: RedirectHome,
  });
  const [signin, signinData] = useCreateUserMutation({
    onCompleted: RedirectHome,
  });
  const [logout] = useLogoutMutation({
    onCompleted: () => {
      RedirectHome();
    },
  });

  const [values, setValue] = useFormValues({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleLoginSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {
          input: { email: values.email, password: values.password },
        },
      });
    } catch {}
  };

  const handleSigninSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const { data } = await signin({
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            email: values.email,
            password: values.password,
          },
        },
      });
    } catch {}
  };

  const handleLogout = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    logout();
  };

  if (data?.currentUser && data?.currentUser.role === UserRole.GUEST) {
    return <ActivateForm {...{ handleLogout }} />;
  }

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Flex width="full" align="center" justifyContent="center">
        <Tabs isFitted variant="unstyled">
          <TabList>
            <Tab _selected={{ opacity: 1 }} opacity="0.2">
              <Box textAlign="center">
                <Heading as="h4" size="md">
                  Login
                </Heading>
              </Box>
            </Tab>
            <Tab _selected={{ opacity: 1 }} opacity="0.2">
              <Box textAlign="center">
                <Heading as="h4" size="md">
                  Sign up
                </Heading>
              </Box>
            </Tab>
          </TabList>
          <TabPanels
            maxWidth="500px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="sm"
          >
            <TabPanel>
              <LoginForm
                {...{
                  handleSubmit: handleLoginSubmit,
                  setValue,
                  onLoading: loginData.loading,
                  onError: loginData.error,
                }}
              />
            </TabPanel>
            <TabPanel>
              <SigninForm
                {...{
                  handleSubmit: handleSigninSubmit,
                  setValue,
                  onLoading: signinData.loading,
                  onError: signinData.error,
                }}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ScaleFade>
  );
}
