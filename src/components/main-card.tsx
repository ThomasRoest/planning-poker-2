import { type ReactNode } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";
import { useThemeColors } from "../lib/use-theme-colors";

type MainCardProps = BoxProps & {
  children: ReactNode;
};

export const MainCard = ({ children, ...props }: MainCardProps) => {
  const colors = useThemeColors();

  return (
    <Box
      width="100%"
      maxWidth="980px"
      mx="auto"
      border="1px"
      borderColor={colors.border}
      bg={colors.cardBg}
      boxShadow={colors.cardShadow}
      borderRadius="3"
      p={5}
      {...props}
    >
      {children}
    </Box>
  );
};
