import "./assets/css/main.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout";

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
