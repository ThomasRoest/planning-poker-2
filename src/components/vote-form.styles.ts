import { chakra } from "@chakra-ui/react";

export const VoteOptionsGrid = chakra("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "10px"
  }
});
