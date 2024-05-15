import "@testing-library/jest-dom";
import AuthorModal from "@/components/elements/AuthorModal";
import useEvent from "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";
import EditButton from "@/components/elements/SidebarEditButton";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Selector from "@/components/elements/Selector";

const server = setupServer(
  rest.get("http://localhost:3001/authorList", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "msw1",
        },
        {
          id: 2,
          name: "msw2",
        },
        {
          id: 3,
          name: "msw3",
        },
      ]),
    );
  }),
  rest.post("http://localhost:3001/createText", (req, res, ctx) => {
    return res(
      ctx.json(
        {
          id: 1,
          title: "msw1",
        },
      ),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

  test("Selectorのレンダリング", () => {
    const props = [
      {
        id: 1,
        name: "msw1",
      },
      {
        id: 2,
        name: "msw2",
      },
      {
        id: 3,
        name: "msw3",
      },
    ];
    render(<Selector authorList={props} />);
    const selectorElement = screen.getByRole("combobox");
    expect(selectorElement).toBeInTheDocument();
  });

  test("Selectorのonchangeイベントの動作確認", async () => {
    const user = useEvent.setup();

    const props = [
      {
        id: 1,
        name: "msw1",
      },
      {
        id: 2,
        name: "msw2",
      },
      {
        id: 3,
        name: "msw3",
      },
    ];
    render(<Selector authorList={props} />);

    const comboBoxElement = screen.getByRole("combobox");
    await user.click(comboBoxElement);

    const menuItem = screen.getByText("msw1");
    await act(async () => {
      await user.click(menuItem);
    });

    expect(comboBoxElement).toBeInTheDocument();
  });
});
