import { useParams } from "react-router";
import { JoinSessionForm } from "../components/join-session-form";
import { VoteForm } from "../components/vote-form";
import { ParticipantsList } from "../components/participants-list";
import { useUserContext } from "../lib/user-context";
import copy from "copy-to-clipboard";
import {
  Badge,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../lib/convex-client";
import { LuCopy } from "react-icons/lu";
import { useThemeColors } from "../lib/theme";
import { toaster } from "../components/toaster";
import { MainCard } from "../components/main-card";

const copyToClipboard = () => {
  const url = window.location.href;
  copy(url);
  toaster.create({
    title: "Copied to clipboard",
    type: "info",
    duration: 3000,
  });
};

export const SessionPage = () => {
  const { uid } = useParams<{ uid: string }>();
  const { user } = useUserContext();
  const session = useQuery(api.sessions.getByUid, { uid: uid ?? "" });
  const resetVotes = useMutation(api.participants.resetVotes);
  const colors = useThemeColors();

  if (session === undefined) {
    return (
      <MainCard minH="200px">
        <Text color={colors.text}>Loading...</Text>
      </MainCard>
    );
  }

  if (session === null) {
    return <Text color={colors.text}>Session not found.</Text>;
  }

  if (!user) {
    return <JoinSessionForm sessionId={session.id} title={session.title} />;
  }

  return (
    <MainCard borderRadius="3px">
      <Flex justifyContent="space-between" align="center">
        <Heading
          as="h1"
          color={colors.heading}
          mb={3}
          display="inline"
          size="2xl"
        >
          {session.title}
        </Heading>
        <Button
          aria-label="Copy url"
          onClick={copyToClipboard}
          variant="ghost"
          bg={colors.iconBtnBg}
          minW="44px"
          h="44px"
          p={0}
          _active={{ transform: "scale(0.98)", opacity: 0.9 }}
        >
          <Icon as={LuCopy} color={colors.mutedText} />
        </Button>
      </Flex>
      <Flex alignItems="center" mb={4}>
        <Badge
          bg={colors.rowSuccessBg}
          color={colors.rowSuccessIcon}
          textTransform="uppercase"
        >
          {user.name}
        </Badge>
      </Flex>
      <Button
        mb={4}
        onClick={() => resetVotes({ sessionId: session.id })}
        bg={colors.neutralButtonBg}
        color={colors.neutralButtonColor}
      >
        Reset
      </Button>
      <VoteForm userId={user.id} participants={session.participants} />
      <ParticipantsList session={session} />
    </MainCard>
  );
};
