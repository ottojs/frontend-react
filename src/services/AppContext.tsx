// Modules
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type SessionData = {
  user: SessionDataUser;
};
type SessionDataUser = {
  name_first: string;
};

interface InterfaceAppContext {
  logout: () => void;
  sessionData: SessionData | false | null;
  setSessionData: (arg: SessionData | false | null) => void;
  setRefreshSession: (arg: boolean) => void;
}

export const AppContext = createContext<InterfaceAppContext>({
  logout: () => {},
  sessionData: null,
  setSessionData: () => {},
  setRefreshSession: () => {},
});

interface Props {
  children: ReactNode;
}
export function AppContextProvider({ children }: Props) {
  // Auth
  const [sessionData, setSessionData] = useState<SessionData | false | null>(
    null,
  );
  const [refreshSession, setRefreshSession] = useState<boolean>(true);

  // Load Session
  useEffect(() => {
    if (!refreshSession) {
      return;
    }
    // Logged In By Default for Demo
    setSessionData({ user: { name_first: "User" } });
    setRefreshSession(false);
  }, [refreshSession]);
  const logout = () => {
    setSessionData(false);
  };

  return (
    <AppContext.Provider
      value={{
        logout,
        setSessionData,
        sessionData,
        setRefreshSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function AppContextConsumer() {
  return useContext(AppContext);
}
