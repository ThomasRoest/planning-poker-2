import { Box } from "@chakra-ui/react";
import { useThemeColors } from "../lib/use-theme-colors";

export const AppFooter = () => {
  const colors = useThemeColors();

  return (
    <Box padding={5} bg={colors.footerBg} color={colors.text}>
      V2
    </Box>
  );
};
