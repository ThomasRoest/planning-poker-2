import { type ChangeEvent, type FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../lib/user-context";
import { Box, Input, Button, Heading, Text } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { api } from "../lib/convex";
import { useThemeColors } from "../lib/theme";
import { toaster } from "./toaster";

export const CreateSessionForm = () => {
  const history = useHistory();
  const { setUser } = useUserContext();
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const colors = useThemeColors();
  const createSession = useMutation(api.sessions.createSession);
  const createParticipant = useMutation(api.participants.createParticipant);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

      toaster.create({
        title: "Session created",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      setErrorMsg("Could not create session");
      setLoading(false);
    }
  };

  if (loading) return <Box color={colors.text}>Loading...</Box>;
  if (errorMsg) return <Text color="red.400">Error: {errorMsg}</Text>;

  return (
    <>
      <Heading size="2xl" mb={4} color={colors.text}>
        Create new session
      </Heading>
      <form onSubmit={handleSubmit}>
        <Text fontWeight="600" mb={2} color={colors.text}>
          Session title{" "}
          <Box as="span" color="red.400">
            *
          </Box>
        </Text>
        <Input
          id="title"
          placeholder="Title"
          mb={4}
          bg={colors.surface}
          borderColor={colors.border}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <Text fontWeight="600" mb={2} color={colors.text}>
          Username{" "}
          <Box as="span" color="red.400">
            *
          </Box>
        </Text>
        <Input
          id="username"
          placeholder="Username"
          bg={colors.surface}
          borderColor={colors.border}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <Button type="submit" mt={4} bg={colors.brand} color="white">
          create new session
        </Button>
      </form>
    </>
  );
};
