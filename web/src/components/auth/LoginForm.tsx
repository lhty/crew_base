import { FormEvent, Dispatch, useState, ChangeEvent } from "react";
import { ApolloError } from "@apollo/client";
import { EmailIcon, UnlockIcon, ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  IconButton,
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import ErrorMessage from "../misc/ErrorMessage";
import { CreateUserInput } from "../../generated/graphql";

interface LoginFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  setValue: Dispatch<Partial<CreateUserInput>>;
  onLoading: boolean;
  onError: ApolloError | Error | undefined;
}

const LoginForm = ({
  handleSubmit,
  setValue,
  onLoading,
  onError,
}: LoginFormProps) => {
  const [showPwd, setShowPwd] = useState(false);
  const handlePasswordVisibility = () => setShowPwd(!showPwd);
  return (
    <>
      {onError && <ErrorMessage message={onError.message} />}
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
                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
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
                type={showPwd ? "text" : "password"}
                placeholder="*******"
                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
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
                  icon={showPwd ? <ViewOffIcon /> : <ViewIcon name="view" />}
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
            {onLoading ? (
              <CircularProgress isIndeterminate size="24px" color="blue.900" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default LoginForm;
