import { useState } from "react";
import { Layout } from "./components/app-layout";
import { SessionPage } from "./pages/session-page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext, type User } from "./lib/user-context";
import About from "./pages/about-page";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Login from "./pages/login-page";
import { AuthContextProvider, PrivateRoute } from "./components/auth-provider";
import { CreateSession } from "./pages/create-session-page";
import { ConvexProvider } from "convex/react";
import { convex } from "./lib/convex-client";
import { ThemeModeProvider } from "./lib/theme";
import { AppToaster } from "./components/toaster";
import NotFoundPage from "./pages/not-found-page";

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
                  <Routes>
                    <Route
                      path="/create-session"
                      element={
                        <PrivateRoute>
                          <CreateSession />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/session/:uid" element={<SessionPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
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
