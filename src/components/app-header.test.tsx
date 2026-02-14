import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import * as React from "react";
import { Router } from "react-router";
import { AppHeader } from "./app-header";

describe("<AppHeader />", () => {
  test("Home link should exist and navigate to home when clicked", () => {
    const history = createMemoryHistory();

    const Example = () => {
      return (
        <Router history={history}>
          <AppHeader />
        </Router>
      );
    };

    const { getByText } = render(<Example />);
    const linkHome = getByText("Planning poker");
    userEvent.click(linkHome);

    expect(history.location.pathname).toEqual("/");
  });

  test("Theme toggle button should exist", () => {
    const history = createMemoryHistory();

    const Example = () => {
      return (
        <Router history={history}>
          <AppHeader />
        </Router>
      );
    };

    const { getByLabelText } = render(<Example />);
    expect(getByLabelText("Toggle dark mode")).toBeInTheDocument();
  });
});
