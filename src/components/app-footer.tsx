import { Box } from "@chakra-ui/react";
import React from "react";
import { useThemeColors } from "../themeMode";

export const AppFooter = () => {
  const colors = useThemeColors();

  return (
    <Box padding={5} bg={colors.footerBg} color={colors.text}>
      Planning poker
    </Box>
  );
};
