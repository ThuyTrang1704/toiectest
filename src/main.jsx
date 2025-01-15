import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import StateContextProvider from "./lib/context/StateContextProvider.jsx";
import APIContextProvider from "./lib/context/APIContextProvider.jsx";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <APIContextProvider>
        <StateContextProvider>
          <ChakraProvider>
            <ConfigProvider>
              <App />
            </ConfigProvider>
          </ChakraProvider>
        </StateContextProvider>
      </APIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
