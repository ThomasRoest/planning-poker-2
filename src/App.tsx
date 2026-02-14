import { useState } from "react";
import { Layout } from "./components/app-layout";
import { SessionPage } from "./pages/session-page";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext, type User } from "./userContext";
import About from "./pages/about-page";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Login from "./pages/login-page";
import { AuthContextProvider, PrivateRoute } from "./components/auth-provider";
import { CreateSession } from "./pages/create-session-page";
import { ConvexProvider } from "convex/react";
import { convex } from "./convex";
import { ThemeModeProvider } from "./themeMode";
import { AppToaster } from "./components/toaster";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ConvexProvider client={convex}>
        <ChakraProvider value={defaultSystem}>
          <ThemeModeProvider>
            <AuthContextProvider>
              <Router>
                <Layout>
                  <Switch>
                    <PrivateRoute path="/create-session">
                      <CreateSession />
                    </PrivateRoute>
                    <Route path="/session/:uid">
                      <SessionPage />
                    </Route>
                    <Route path="/about">
                      <About />
                    </Route>
                    <Route path="/">
                      <Login />
                    </Route>
                  </Switch>
                </Layout>
                <AppToaster />
              </Router>
            </AuthContextProvider>
          </ThemeModeProvider>
        </ChakraProvider>
      </ConvexProvider>
    </UserContext.Provider>
  );
};

export default App;
