import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider
      theme={{
        colors: {
          primary: "#C562FF",
          secondary: "#2BC2A1",
          accent: "#E4FF45",
        },
      }}
    >
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
