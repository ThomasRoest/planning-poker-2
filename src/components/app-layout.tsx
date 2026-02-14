import React from "react";
import { AppHeader } from "./app-header";
import { AppFooter } from "./app-footer";
import { Box, Container, Grid } from "@chakra-ui/react";
import { useThemeColors } from "../themeMode";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const colors = useThemeColors();

  return (
    <Grid templateRows="auto 1fr auto" minHeight="100vh" bg={colors.appBg} color={colors.text}>
      <AppHeader />
      <Container maxW="1200px" width="100%" px={4}>
        <Box py={3}>{children}</Box>
      </Container>
      <AppFooter />
    </Grid>
  );
};
