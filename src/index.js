import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { Web3ContextProvider } from "./hooks";

import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import store from "./store/store";
import { SnackMessage } from "./components";

let persistor = persistStore(store);

ReactDOM.render(
  <SnackbarProvider
    maxSnack={4}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    content={(key, message) => (
      <SnackMessage id={key} message={JSON.parse(message)} />
    )}
    autoHideDuration={10000}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <Web3ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Web3ContextProvider>
    </Provider>
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
