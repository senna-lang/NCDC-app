import "@testing-library/jest-dom";
import AuthorModal from "@/components/elements/AuthorModal";
import useEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";
import EditButton from "@/components/elements/SidebarEditButton";

describe("AuthorModal", () => {
  test("AuthorModalはレンダリングされていない", () => {
    render(<AuthorModal />);
    const modalElement = screen.queryByTestId("author-modal");
    expect(modalElement).not.toBeInTheDocument();
  });

  test("SidebarEditButtonをクリックするとAuthorModalがレンダリングされる", async () => {
    render(<EditButton />);
    render(<AuthorModal />);
    const user = useEvent.setup();
    const editButtonElement = screen.getByRole("button", {
      name: "Edit",
    });
    await user.click(editButtonElement);
    const newPageButtonElement = screen.getByRole("button", {
      name: "New page",
    });
    await user.click(newPageButtonElement);
    const modalElement = screen.queryByTestId("author-modal");
    expect(modalElement).toBeInTheDocument();
  });

  test("inputのレンダリング", () => {
    render(<AuthorModal />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });



  test("RegisterAuthorのinputへの入力", async () => {
    render(<AuthorModal />);
    const user = useEvent.setup();
    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "テストです");
    expect(inputElement).toHaveValue("テストです");
  });
});
