import React from "react";
import { useParams } from "react-router";
import { JoinSessionForm } from "../../components/JoinSessionForm";
import { VoteForm } from "../../components/VoteForm";
import { ParticipantsList } from "../../components/ParticipantsList";
import { UserContext } from "../../userContext";
import copy from "copy-to-clipboard";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex";

export const SessionPage = () => {
  const { uid } = useParams<{ uid: string }>();
  const { user } = React.useContext(UserContext);
  const session = useQuery(api.sessions.getByUid, { uid });
  const resetVotes = useMutation(api.participants.resetVotes);
  const toast = useToast();

  const borderColor = useColorModeValue("gray.300", "gray.600");

  if (session === undefined) return <Box width="50%">Loading..</Box>;
  if (session === null) return <p>Session not found.</p>;

  const copyToClipboard = () => {
    const url = window.location.href;
    copy(url);
    toast({
      title: "Copied to clipboard",
      status: "info",
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <div>
      {!user && (
        <JoinSessionForm sessionId={session.id} title={session.title} />
      )}
      {user && (
        <Box
          border="1px"
          borderColor={borderColor}
          borderRadius="3px"
          padding="5"
        >
          <Flex justifyContent="space-between" align="center">
            <Heading as="h1" color="gray.500" mb={3} display="inline">
              {session.title}
            </Heading>
            <Tooltip label="Share url" aria-label="share">
              <IconButton
                aria-label="Copy url"
                icon={<CopyIcon />}
                onClick={copyToClipboard}
              />
            </Tooltip>
          </Flex>
          <Flex alignItems="center" mb={4}>
            <Badge colorScheme="green">{user.name}</Badge>
          </Flex>
          <Button
            mb={4}
            onClick={() => resetVotes({ sessionId: session.id })}
          >
            Reset
          </Button>
          <VoteForm userId={user.id} participants={session.participants} />
          <ParticipantsList session={session} />
        </Box>
      )}
    </div>
  );
};
