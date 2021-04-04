import { FormEvent, Dispatch, useState, ChangeEvent } from "react";
import { ApolloError } from "@apollo/client";
import {
  InfoIcon,
  PhoneIcon,
  EmailIcon,
  UnlockIcon,
  ViewOffIcon,
  ViewIcon,
} from "@chakra-ui/icons";
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

interface SigninFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  setValue: Dispatch<Partial<CreateUserInput>>;
  onLoading: boolean;
  onError: ApolloError | undefined;
}

const SigninForm = ({
  handleSubmit,
  setValue,
  onLoading,
  onError,
}: SigninFormProps) => {
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
                children={<InfoIcon color="gray.600" />}
              />
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
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
                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
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
                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
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
                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
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
              "Sign up"
            )}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default SigninForm;
