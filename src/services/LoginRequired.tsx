// Modules
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAppContext from "./AppContext";
import { getDestination } from "../lib/functions";

interface Props {
  children: ReactNode;
}
const LoginRequired = ({ children }: Props) => {
  const location = useLocation();
  const appcontext = useAppContext();
  if (appcontext.sessionData === false) {
    return <Navigate to={getDestination("/login", location)} />;
  }
  return children;
};

export default LoginRequired;
