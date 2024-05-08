import "@testing-library/jest-dom";

import TextTitle from "@/features/TextTitle";
import { render, screen } from "@testing-library/react";

describe("MainArea", () => {
  test("TextTitleレンダリング", () => {
    render(<TextTitle textTitle="テスト" />);
    const titleElement = screen.getByRole("heading");
    expect(titleElement).toBeInTheDocument();
  });

  test("inputはレンダリングされていない", () => {
    render(<TextTitle textTitle="テスト" />);
    const inputElement = screen.queryByRole("textbox");
    expect(inputElement).not.toBeInTheDocument();
  });

  
});
