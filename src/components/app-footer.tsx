import { Box } from "@chakra-ui/react";
import { useThemeColors } from "../lib/theme";

export const AppFooter = () => {
  const colors = useThemeColors();

  return (
    <Box padding={5} bg={colors.footerBg} color={colors.text}>
      Planning poker
    </Box>
  );
};
