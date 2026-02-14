import React from "react";
import { Layout } from "./components/Layout";
import { SessionPage } from "./pages/Session";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./userContext";
import About from "./pages/About";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";
import { AuthContextProvider, PrivateRoute } from "./components/Auth/AuthProvider";
import { CreateSession } from "./pages/CreateSession";
import { ConvexProvider } from "convex/react";
import { convex } from "./convex";

const App = () => {
  const [user, setUser] = React.useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ConvexProvider client={convex}>
        <ChakraProvider>
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
            </Router>
          </AuthContextProvider>
        </ChakraProvider>
      </ConvexProvider>
    </UserContext.Provider>
  );
};

export default App;
