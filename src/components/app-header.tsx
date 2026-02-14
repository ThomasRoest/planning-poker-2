import { Link } from "react-router-dom";
import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useThemeColors, useThemeMode } from "../lib/theme";

export const AppHeader = () => {
  const { mode, toggleMode } = useThemeMode();
  const colors = useThemeColors();

  return (
    <Flex
      as="header"
      p="5"
      justifyContent="space-between"
      borderBottom="1px"
      borderColor={colors.border}
      boxShadow={colors.headerShadow}
      align="center"
      bg={colors.surface}
    >
      <Link to="/">
        <Heading color={colors.brand}>Planning poker</Heading>
      </Link>
      <Button
        aria-label="Toggle dark mode"
        onClick={toggleMode}
        variant="ghost"
        minW="40px"
        h="40px"
        p={0}
        bg={colors.iconBtnBg}
        color={colors.text}
        _hover={{ bg: colors.iconBtnBg, opacity: 0.9 }}
      >
        <Icon as={mode === "light" ? LuMoon : LuSun} color={colors.text} />
      </Button>
    </Flex>
  );
};
