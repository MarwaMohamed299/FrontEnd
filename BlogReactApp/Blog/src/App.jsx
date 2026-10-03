import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Layout from "./components/LayOut/Layout.jsx";
import About from "./components/About/About.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Settings from "./components/Settings/Settings.jsx";
import WebSettings from "./components/Web/Web.jsx";
import MobileSettings from "./components/Mobile/Mobile.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/settings",
        element: <Settings />,
        children:[
          {
            path: "web",
            element: <WebSettings />
          },
          {
            path: "mobile",
            element: <MobileSettings />
          },
        ]
      }
      // {
      //   path: "*",
      //   element: <NotFound />,
      // }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
