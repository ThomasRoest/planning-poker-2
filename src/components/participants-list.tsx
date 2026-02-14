import { ISession } from "../lib/types";
import Confetti from "react-confetti";
import { useUserContext } from "../lib/user-context";
import {
  Flex,
  Box,
  List,
  Heading,
  Stat,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { api } from "../lib/convex";
import {
  LuArrowDown,
  LuArrowUp,
  LuCircleCheck,
  LuMinus,
  LuTrash2,
} from "react-icons/lu";
import { useThemeColors } from "../lib/theme";

const Value = ({ priority }: { priority: string }) => {
  switch (priority) {
    case "HIGH":
      return (
        <span>
          <Icon as={LuArrowUp} color="green.500" ml={5} mb={1} />
        </span>
      );
    case "LOW":
      return (
        <span>
          <Icon as={LuArrowDown} color="blue.500" ml={5} mb={1} />
        </span>
      );
    case "MEDIUM":
      return (
        <span>
          <Icon as={LuMinus} color="orange.500" ml={5} mb={1} />
        </span>
      );

    default:
      return null;
  }
};

interface ParticipantProps {
  session: ISession;
}

export const ParticipantsList = ({ session }: ParticipantProps) => {
  const { user } = useUserContext();
  const deleteUser = useMutation(api.participants.deleteParticipant);
  const colors = useThemeColors();

  const votes: number[] = session.participants
    .map((participant) => participant.vote)
    .filter((vote): vote is number => vote !== null);

  let result;
  let consensus;
  if (votes.length === session.participants.length && votes.length > 1) {
    const total = votes.reduce((acc: number, result: number) => {
      return acc + result;
    }, 0);
    result = Math.round(total / session.participants.length);
    consensus = votes.every((val, i, arr) => val === arr[0]);
  }

  const listItemColor = colors.rowSuccessBg;
  const checkIconColor = colors.rowSuccessIcon;

  if (typeof result === "number") {
    return (
      <Flex align="center" justifyContent="space-between" mt={5}>
        <Box>
          <List.Root listStyle="none">
            {session.participants.map((participant) => {
              const content = (
                <Box w="180px" display="flex" justifyContent="space-between" color={colors.text}>
                  <Text>{participant.name}</Text>
                  <Box minW="45px" color={colors.text}>
                    {participant.vote}
                    {participant.priority && (
                      <Value
                        key={participant.id}
                        priority={participant.priority}
                      />
                    )}
                  </Box>
                </Box>
              );
              return (
                <List.Item
                  display="flex"
                  mb={1}
                  minWidth="120px"
                  justifyContent="space-between"
                  key={participant.id}
                >
                  {content}
                </List.Item>
              );
            })}
          </List.Root>
        </Box>
        <Box>
          {consensus && (
            <Heading as="h3" color={colors.rowSuccessIcon} size="md">
              Consensus!
              <Confetti numberOfPieces={100} />
            </Heading>
          )}
          <Stat.Root>
            <Stat.Label color={colors.text}>Average</Stat.Label>
            <Stat.ValueText color={colors.text}>{result}</Stat.ValueText>
          </Stat.Root>
        </Box>
      </Flex>
    );
  } else {
    return (
      <List.Root gap={3} mt={4}>
        <Box borderTop="1px" borderColor={colors.border} />
        {session.participants.map((participant) => {
          return (
            <List.Item
              mb={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderRadius="3px"
              padding=".5rem .5rem"
              key={participant.id}
              bg={participant.vote === null ? void 0 : listItemColor}
            >
              <Text color={colors.text}>{participant.name}</Text>
              <Flex align="center">
                {participant.vote !== null && (
                  <Icon as={LuCircleCheck} boxSize="5" color={checkIconColor} mr={2} />
                )}
                {user?.owner && (
                  <Button
                    onClick={() => deleteUser({ participantId: participant.id })}
                    variant="outline"
                    aria-label="delete"
                    borderColor={colors.border}
                    color={colors.text}
                    bg={colors.cardBg}
                    minW="40px"
                    h="40px"
                    p={0}
                  >
                    <Icon as={LuTrash2} />
                  </Button>
                )}
              </Flex>
            </List.Item>
          );
        })}
      </List.Root>
    );
  }
};
