import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import { store } from "../src/store";
import { BrowserRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function WaitForStateRehydration({ children }) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : <Spinner />;
}

ReactDOM.render(
  <StoreProvider store={store}>
    <WaitForStateRehydration>
      <App />
    </WaitForStateRehydration>
  </StoreProvider>,

  document.getElementById("root"),
);
