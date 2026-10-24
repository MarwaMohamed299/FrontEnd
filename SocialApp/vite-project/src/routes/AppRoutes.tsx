import AuthLayOut from "../LayOuts/AuthLayOut/AuthLayOut";
import NotFound from "../pages/NotFound/NotFound";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import MainLayOut from "../LayOuts/MainLayOut/MainLayOut";
import Feed from "../pages/Feed/Feed";
import Profile from "../pages/Profile/Profile";
import ProtectedRoutes from "../components/ProtextedRoutes/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      { index:true, element:  <ProtectedRoutes><Feed/></ProtectedRoutes> },
      { path: "profile", element:<ProtectedRoutes><Profile/></ProtectedRoutes> },
      { path: "*", element: <NotFound /> },
    ],
  },

  {
    path: "auth",
    element: <AuthLayOut />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);
