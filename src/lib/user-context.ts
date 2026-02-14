import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Id } from "../../convex/_generated/dataModel";

export type User = {
  id: Id<"participants">;
  name: string;
  owner: boolean;
};

export type UserContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextValue | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within UserContext.Provider");
  }

  return context;
};
