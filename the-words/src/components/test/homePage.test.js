import React from "react";
import { render } from "@testing-library/react"
import HomePage from "../pages/homePage"
import { BrowserRouter } from "react-router-dom";

describe("Home page should have a search button", () => {
    it("rendered HomePage", () => {
        const { getByTestId } = render(<BrowserRouter><HomePage /></BrowserRouter>);
        const Button = getByTestId("searchButton");
        expect(Button).toBeTruthy();
    })

})