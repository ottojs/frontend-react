// Modules
// Use this if you want to redirect somewhere on 404
// import { Navigate } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageRegister from "./pages/PageRegister";
import PageLogin from "./pages/PageLogin";
import PageError from "./pages/PageError";
import Page404 from "./pages/Page404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageError />,
    children: [
      {
        path: "/",
        element: <PageHome />,
      },
      {
        path: "/about",
        element: <PageAbout />,
      },
      {
        path: "/register",
        element: <PageRegister />,
      },
      {
        path: "/login",
        element: <PageLogin />,
      },
      {
        path: "*",
        // Redirect to Home
        //element: <Navigate to="/" replace />,
        element: <Page404 />,
      },
    ],
  },
]);

export default router;
