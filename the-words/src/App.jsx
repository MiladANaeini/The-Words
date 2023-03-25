import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import "./components/assets/css/main.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  );
}

export default App;
