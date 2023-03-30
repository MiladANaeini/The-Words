import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../components/pages/homePage";

describe("Testing the buttons in home page", async () => {
  it("Should exist in home page", () => {
    render(() => <HomePage url="/" />);
    setTimeout(() => {
      const { button } = screen.getByText("Search Page");
      expect(button).toBeTruthy();
    }, 1000);
  });
});
