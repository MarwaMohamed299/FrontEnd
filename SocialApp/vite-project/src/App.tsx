import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import { Toast } from "@heroui/react";
import CounterContextProvider from "../src/context/CounterContext";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <CounterContextProvider>
          <Toast.Provider placement="top" />
          <RouterProvider router={router}></RouterProvider>
        </CounterContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;