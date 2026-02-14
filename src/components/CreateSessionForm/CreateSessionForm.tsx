import React from "react";
import { useHistory } from "react-router-dom";
import { LoadingCube } from "../LoadingCube";
import { UserContext } from "../../userContext";
import {
  useToast,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { api } from "../../convex";

export const CreateSessionForm = () => {
  const history = useHistory();
  const toast = useToast();
  const { setUser } = React.useContext(UserContext);
  const [title, setTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const createSession = useMutation(api.sessions.createSession);
  const createParticipant = useMutation(api.participants.createParticipant);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const session = await createSession({ title });
      const participant = await createParticipant({
        name: username,
        sessionId: session.id,
        owner: true,
      });

      const { id, name, owner } = participant;
      setUser({ id, name, owner });

      history.push(`/session/${session.uid}`);

      toast({
        title: "Session created",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      setErrorMsg("Could not create session");
      setLoading(false);
    }
  };

  const borderColor = useColorModeValue("gray.300", "gray.600");

  if (loading)
    return (
      <Box>
        <LoadingCube />
        creating new session..
      </Box>
    );
  if (errorMsg) return <p>Error: {errorMsg}</p>;

  return (
    <Box
      border="1px"
      borderColor={borderColor}
      padding="5"
      borderRadius="3"
    >
      <Heading size="lg" mb={4}>
        Create new session
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="title">Session title</FormLabel>
          <Input
            id="title"
            placeholder="Title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          create new session
        </Button>
      </form>
    </Box>
  );
};
