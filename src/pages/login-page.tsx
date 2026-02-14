import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import {
  Button,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useAuthContext } from "../components/auth-provider";
import { useHistory } from "react-router";
import { useThemeColors } from "../themeMode";
import { MainCard } from "../components/main-card";

const Login = () => {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [submitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const colors = useThemeColors();

  const { signIn } = useAuthContext();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setIsSubmitting(true);
      try {
        await signIn(password);
        history.push("/create-session");
      } catch (error) {
        setIsSubmitting(false);
        setErrorMsg("incorrect password");
      }
    },
    [history, password, signIn]
  );

  return (
    <MainCard>
      <Heading size="lg" mb={4} color={colors.text}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          id="wachtwoord"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          type="password"
          bg={colors.surface}
          borderColor={colors.border}
          color={colors.text}
        />
        {errorMsg && (
          <Text mt={2} color="red.400">
            Incorrect password.
          </Text>
        )}
        <Button type="submit" mt={4} loading={submitting} bg={colors.brand} color="white">
          Submit
        </Button>
      </form>
    </MainCard>
  );
};

export default Login;
