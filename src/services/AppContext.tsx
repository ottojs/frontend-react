// Modules
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { sessionService } from "./apiClient";
import { ApiRequest, CurrentSession } from "../types";

interface InterfaceAppContext {
  logout: () => void;
  sessionData: CurrentSession | false | null;
  setSessionData: (arg: CurrentSession | false | null) => void;
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
  const [sessionData, setSessionData] = useState<CurrentSession | false | null>(
    null,
  );
  const [refreshSession, setRefreshSession] = useState<boolean>(true);

  // Load Session
  // TODO: Runs Twice. Possible Cause is React Strict Mode
  useEffect(() => {
    if (!refreshSession) {
      return;
    }
    setRefreshSession(false);
    console.log("SESSION REFRESH");
    // TODO: Cancel
    const { request } = sessionService.read<ApiRequest>({
      id: "me",
    });
    request
      .then((res) => {
        console.log("SESSION OK");
        setSessionData(res.data.data);
      })
      .catch(() => {
        setSessionData(false);
      });
  }, [refreshSession]);

  const logout = () => {
    // TODO: Cancel
    // TODO: Show error
    const { request } = sessionService.delete({
      // TODO: Use full id?
      //id: sessionData?.session.id,
      id: "me",
    });
    request.then(() => {
      setSessionData(false);
    });
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
