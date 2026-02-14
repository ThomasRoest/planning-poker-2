import { Text } from "@chakra-ui/react";
import { useThemeColors } from "../themeMode";
import { MainCard } from "../components/main-card";

const About = () => {
  const colors = useThemeColors();
  return (
    <MainCard>
      <Text color={colors.text}>Planning poker</Text>
    </MainCard>
  );
};

export default About;
