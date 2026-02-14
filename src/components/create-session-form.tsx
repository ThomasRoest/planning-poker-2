import React from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../userContext";
import {
  Box,
  Input,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { api } from "../convex";
import { useThemeColors } from "../themeMode";
import { toaster } from "./toaster";
import { MainCard } from "./main-card";

export const CreateSessionForm = () => {
  const history = useHistory();
  const { setUser } = React.useContext(UserContext);
  const [title, setTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const colors = useThemeColors();
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

  if (loading)
    return (
      <Box color={colors.text}>
        Loading...
      </Box>
    );
  if (errorMsg) return <Text color="red.400">Error: {errorMsg}</Text>;

  return (
    <MainCard>
      <Heading size="2xl" mb={4} color={colors.text}>
        Create new session
      </Heading>
      <form onSubmit={handleSubmit}>
        <Text fontWeight="600" mb={2} color={colors.text}>
          Session title <Box as="span" color="red.400">*</Box>
        </Text>
        <Input
          id="title"
          placeholder="Title"
          mb={4}
          bg={colors.surface}
          borderColor={colors.border}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <Text fontWeight="600" mb={2} color={colors.text}>
          Username <Box as="span" color="red.400">*</Box>
        </Text>
        <Input
          id="username"
          placeholder="Username"
          bg={colors.surface}
          borderColor={colors.border}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <Button type="submit" mt={4} bg={colors.brand} color="white">
          create new session
        </Button>
      </form>
    </MainCard>
  );
};
