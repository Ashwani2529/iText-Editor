import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("jodit-react", () => {
  const ReactLibrary = require("react");
  return ReactLibrary.forwardRef(function MockEditor(_props, ref) {
    return <div ref={ref} role="textbox" aria-label="Rich text editor" />;
  });
});

test("renders the writing workspace", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /turn rough thoughts into clear words/i })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /rich text editor/i })).toBeInTheDocument();
});
