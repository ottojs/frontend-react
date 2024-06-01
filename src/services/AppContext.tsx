// Modules
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, useLocation } from "react-router-dom";
import { getDestination } from "../lib/functions";
import { sessionService } from "./apiClient";
import { ApiRequest, CurrentSession } from "../types";

interface InterfaceAppContext {
  // light, dark
  theme: string;
  setTheme: (theme: string) => void;
  logout: () => void;
  sessionData: CurrentSession | false | null;
  setSessionData: (arg: CurrentSession | false | null) => void;
  setRefreshSession: (arg: boolean) => void;
}

export const AppContext = createContext<InterfaceAppContext>({
  theme: "light",
  setTheme: () => {},
  logout: () => {},
  sessionData: null,
  setSessionData: () => {},
  setRefreshSession: () => {},
});

interface Props {
  children: ReactNode;
}
export function AppContextProvider({ children }: Props) {
  const location = useLocation();

  // Theme Light/Dark
  const isThemeDark = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
  const [theme, setTheme] = useState(isThemeDark ? "dark" : "light");
  // TODO: Should we use a Ref? I guess not since
  //       React does not create <html> element
  const htmlElement = document.querySelector("html");
  useEffect(() => {
    htmlElement?.setAttribute("data-bs-theme", theme);
  }, [theme, htmlElement]);

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

  // Loading
  if (sessionData === null) {
    return <h1 className="text-center">Loading...</h1>;
  }

  // Profile Gate if logged in
  if (sessionData && sessionData.user) {
    if (
      sessionData.user.name_first === "" ||
      sessionData.user.name_last === ""
    ) {
      if (location.pathname != "/profile") {
        return <Navigate to={getDestination("/profile", location)} />;
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
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
