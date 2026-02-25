import { VoteOptionsGrid } from "./vote-form.styles";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../lib/convex-client";
import type { Participant, Priority } from "../lib/convex-types";
import { LuArrowDown, LuArrowUp, LuMinus } from "react-icons/lu";
import { useThemeColors } from "../lib/theme/use-theme-colors";

interface VoteFormProps {
  userId: Id<"participants">;
  participants: Participant[];
}

export const VoteForm = ({ userId, participants }: VoteFormProps) => {
  const createVote = useMutation(api.participants.setVote);
  const setPriority = useMutation(api.participants.setPriority);
  const colors = useThemeColors();
  const currentParticipant = participants.find(
    (participant: Participant) => participant.id === userId
  );
  const activeVote = currentParticipant?.vote ?? null;
  const activePriority = currentParticipant?.priority ?? null;

  const submit = (vote: number) => {
    createVote({ participantId: userId, vote });
  };

  const handleSetPriority = (priority: Priority) => {
    setPriority({ participantId: userId, priority });
  };

  const options = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];

  return (
    <Box>
      <VoteOptionsGrid>
        {options.map((option) => {
          return (
            <Button
              key={option}
              size="sm"
              bg={activeVote === option ? colors.activeVoteBg : colors.neutralButtonBg}
              color={activeVote === option ? "#0f172a" : colors.neutralButtonColor}
              fontWeight="700"
              onClick={() => submit(option)}
            >
              {option} points
            </Button>
          );
        })}
      </VoteOptionsGrid>
      <Box mt={5}>
        <Text as="span" mr={5} color={colors.text}>
          Value
        </Text>
        <Button
          size="sm"
          bg={activePriority === "LOW" ? colors.activeVoteBg : colors.neutralButtonBg}
          color={activePriority === "LOW" ? "#0f172a" : colors.neutralButtonColor}
          variant="solid"
          mr={2}
          onClick={() => handleSetPriority("LOW")}
        >
          <Icon as={LuArrowDown} mr={2} color="blue.400" />
          Low
        </Button>
        <Button
          size="sm"
          bg={activePriority === "MEDIUM" ? colors.activeVoteBg : colors.neutralButtonBg}
          color={activePriority === "MEDIUM" ? "#0f172a" : colors.neutralButtonColor}
          variant="solid"
          mr={2}
          onClick={() => handleSetPriority("MEDIUM")}
        >
          <Icon as={LuMinus} mr={2} color="orange.400" />
          Medium
        </Button>
        <Button
          size="sm"
          bg={activePriority === "HIGH" ? colors.activeVoteBg : colors.neutralButtonBg}
          color={activePriority === "HIGH" ? "#0f172a" : colors.neutralButtonColor}
          variant="solid"
          onClick={() => handleSetPriority("HIGH")}
        >
          <Icon as={LuArrowUp} mr={2} color="green.400" />
          High
        </Button>
      </Box>
    </Box>
  );
};
