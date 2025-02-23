// Modules
import { createContext } from "react";
import { CurrentSession } from "../types";

export interface InterfaceAppContext {
  // light, dark
  theme: string;
  setTheme: (theme: string) => void;
  logout: () => void;
  sessionData: CurrentSession | false | null;
  setSessionData: (arg: CurrentSession | false | null) => void;
  setRefreshSession: (arg: boolean) => void;
  analytics: string | null;
}

export const AppContext = createContext<InterfaceAppContext>({
  theme: "light",
  setTheme: () => {},
  logout: () => {},
  sessionData: null,
  setSessionData: () => {},
  setRefreshSession: () => {},
  analytics: null,
});
