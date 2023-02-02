import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContaxtProvider } from "./context/darkModeContext";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <DarkModeContaxtProvider>
  // <AuthContextProvider>
  <Provider store={store}>
    <App />
  </Provider>
  // {/* </AuthContextProvider> */}
  // </DarkModeContaxtProvider>
);
