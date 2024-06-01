import { Outlet } from "react-router-dom";
import { AppContextProvider } from "./services/AppContext";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <AppContextProvider>
      <Navbar />
      <Outlet />
    </AppContextProvider>
  );
}

export default App;
