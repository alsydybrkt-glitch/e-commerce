// import React from 'react'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.jsx";
import { CategoriesProvider } from "./context/slideDetails.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
