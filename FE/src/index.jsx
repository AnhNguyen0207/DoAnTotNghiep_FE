import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

reportWebVitals();
