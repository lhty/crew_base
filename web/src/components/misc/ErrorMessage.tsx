import {
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  SlideFade,
} from "@chakra-ui/react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <SlideFade in={!!message} offsetY={60}>
      <Box>
        <Alert status="error" borderRadius={4}>
          <AlertIcon />
          <AlertDescription>
            {message.length > 35 ? message.slice(0, 35) + "..." : message}
          </AlertDescription>
        </Alert>
      </Box>
    </SlideFade>
  );
}
