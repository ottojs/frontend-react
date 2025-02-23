// Modules
import { ReactNode, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, useLocation } from "react-router-dom";
import { getDestination } from "../lib/functions";
import { sessionService, vanilla } from "./apiClient";
import { ApiRequest, CurrentSession } from "../types";
import { AppContext } from "./AppContext.lib";

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
  // TODO: Runs Twice. Possible reason is React Strict Mode
  useEffect(() => {
    if (!refreshSession) {
      return;
    }
    setRefreshSession(false);
    console.log("SESSION REFRESH");
    // TODO: Add cancel function
    const { request } = sessionService.read<ApiRequest>({
      id: "me",
    });
    request
      .then((res) => {
        console.log("SESSION OK");
        if (res.data.data.picture === "") {
          res.data.data.picture = null;
        }
        setSessionData(res.data.data);
      })
      .catch(() => {
        setSessionData(false);
      });
    // TODO: This cancels both times... why? Does this unmount?
    //return cancel;
  }, [refreshSession]);

  const logout = () => {
    const { request } = sessionService.delete({
      // TODO: Use full id?
      //id: sessionData?.session.id,
      id: "me",
    });
    request.then(() => {
      setSessionData(false);
    });
  };

  // Analytics Session
  const [analytics, setAnalytics] = useState<string | null>(null);
  useEffect(() => {
    const analyticsKey = "analytics_session_id";
    const analyticsExists = localStorage.getItem(analyticsKey);
    console.log("ANALYTICS EXISTS", analyticsExists);
    if (analyticsExists) {
      setAnalytics(analyticsExists);
    } else {
      vanilla.post("/v0/analytics/sessions").then((res) => {
        setAnalytics(res.data.data.session.id);
        localStorage.setItem(analyticsKey, res.data.data.session.id);
      });
    }
  }, []);

  // Loading
  if (sessionData === null || analytics === null) {
    return <h1 className="mt-5 text-center">Loading...</h1>;
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
        analytics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function AppContextConsumer() {
  return useContext(AppContext);
}
