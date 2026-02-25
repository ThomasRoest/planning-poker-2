import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../lib/user-context";
import { Box, Input, Button, Heading, Text } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { api } from "../lib/convex-client";
import { useThemeColors } from "../lib/theme";
import { toaster } from "./toaster";

export const CreateSessionForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const colors = useThemeColors();
  const createSession = useMutation(api.sessions.createSession);
  const createParticipant = useMutation(api.participants.createParticipant);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);

    const normalizedTitle = title.trim();
    const normalizedUsername = username.trim();
    if (!normalizedTitle) {
      setErrorMsg("Session title is required");
      return;
    }
    if (!normalizedUsername) {
      setErrorMsg("Username is required");
      return;
    }

    setLoading(true);
    try {
      const session = await createSession({ title: normalizedTitle });
      const participant = await createParticipant({
        name: normalizedUsername,
        sessionId: session.id,
        owner: true,
      });

      const { id, name, owner } = participant;
      setUser({ id, name, owner });

      navigate(`/session/${session.uid}`);

      toaster.create({
        title: "Session created",
        type: "success",
        duration: 3000,
      });
    } catch {
      setErrorMsg("Could not create session");
    } finally {
      setLoading(false);
    }
  };

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
          value={title}
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
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <Button type="submit" mt={4} bg={colors.brand} color="white">
          {loading ? "Creating session..." : "Create session"}
        </Button>
        {errorMsg ? (
          <Text color="red.400" mt={3}>
            Error: {errorMsg}
          </Text>
        ) : null}
      </form>
    </>
  );
};
