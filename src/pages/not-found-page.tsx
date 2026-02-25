import { Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MainCard } from "../components/main-card";
import { useThemeColors } from "../lib/use-theme-colors";

const NotFoundPage = () => {
  const colors = useThemeColors();
  const navigate = useNavigate();

  return (
    <MainCard>
      <Heading as="h1" size="lg" mb={2} color={colors.text}>
        Page not found
      </Heading>
      <Text mb={4} color={colors.mutedText}>
        The page you are looking for does not exist.
      </Text>
      <Button onClick={() => navigate("/")} bg={colors.brand} color="white">
        Back to login
      </Button>
    </MainCard>
  );
};

export default NotFoundPage;
