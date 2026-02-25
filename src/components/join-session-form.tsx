import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useUserContext } from "../lib/auth/user-context";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../lib/convex-client";
import { useThemeColors } from "../lib/theme/use-theme-colors";
import { toaster } from "../lib/toaster";
import { MainCard } from "./main-card";

interface JoinSessionFormProps {
  sessionId: Id<"sessions">;
  title: string;
}

export const JoinSessionForm = ({ sessionId, title }: JoinSessionFormProps) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setUser } = useUserContext();
  const createParticipant = useMutation(api.participants.createParticipant);
  const colors = useThemeColors();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedName = name.trim();
    if (!normalizedName) {
      setErrorMsg("Name is required");
      return;
    }
    
    setLoading(true);
    try {
      const participant = await createParticipant({
        name: normalizedName,
        sessionId,
        owner: false,
      });
      setUser({ id: participant.id, name: participant.name, owner: false });
      toaster.create({
        title: "Joined session",
        type: "success",
        duration: 3000,
      });
    } catch {
      setErrorMsg("Could not join session");
    } finally {
      setLoading(false);
    }
  };

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
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        {errorMsg ? (
          <Text color="red.400" mt={3}>
            Error: {errorMsg}
          </Text>
        ) : null}
        <Button type="submit" mt={4} bg={colors.brand} color="white">
          {loading ? "Joining session..." : "Join session"}
        </Button>
      </form>
    </MainCard>
  );
};
