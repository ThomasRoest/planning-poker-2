import React from "react";
import { LoadingCube } from "../LoadingCube";
import { UserContext } from "../../userContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "convex/react";
import type { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../convex";
interface JoinSessionFormProps {
  sessionId: Id<"sessions">;
  title: string;
}

export const JoinSessionForm = ({ sessionId, title }: JoinSessionFormProps) => {
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const { setUser } = React.useContext(UserContext);
  const toast = useToast();
  const createParticipant = useMutation(api.participants.createParticipant);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const participant = await createParticipant({ name, sessionId, owner: false });

      setUser({ id: participant.id, name: participant.name });

      toast({
        title: "Joined session",
        status: "success",
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      setErrorMsg("Could not join session");
      setLoading(false);
    }
  };

  const borderColor = useColorModeValue("gray.300", "gray.600");

  if (loading)
    return (
      <Box width="50%">
        <LoadingCube />
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
      <Heading as="h1" color="gray.500" mb={2}>
            {title}
          </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Enter name to join this session</FormLabel>
          <Input
            id="name"
            placeholder="Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Button type="submit" mt={4} colorScheme="teal">
            Join session
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
