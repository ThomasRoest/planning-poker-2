import React from "react";
import { UserContext } from "../userContext";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../convex";
import { useThemeColors } from "../themeMode";
import { toaster } from "./toaster";
import { MainCard } from "./main-card";
interface JoinSessionFormProps {
  sessionId: Id<"sessions">;
  title: string;
}

export const JoinSessionForm = ({ sessionId, title }: JoinSessionFormProps) => {
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const { setUser } = React.useContext(UserContext);
  const createParticipant = useMutation(api.participants.createParticipant);
  const colors = useThemeColors();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const participant = await createParticipant({ name, sessionId, owner: false });

      setUser({ id: participant.id, name: participant.name });

      toaster.create({
        title: "Joined session",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      setErrorMsg("Could not join session");
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box width="50%" color={colors.text}>
        Loading...
      </Box>
    );
  if (errorMsg) return <Text color="red.400">Error: {errorMsg}</Text>;

  return (
    <MainCard>
      <Heading as="h1" color={colors.heading} mb={2} size="2xl">
        {title}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Text fontWeight="600" mb={2} color={colors.text}>
          Enter name to join this session <Box as="span" color="red.400">*</Box>
        </Text>
        <Input
          id="name"
          placeholder="Name"
          bg={colors.surface}
          borderColor={colors.border}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <Button type="submit" mt={4} bg={colors.brand} color="white">
          Join session
        </Button>
      </form>
    </MainCard>
  );
};
