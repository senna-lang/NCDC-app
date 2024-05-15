import "@testing-library/jest-dom";

import TextTitle from "@/features/TextTitle";
import {
  render,
  renderHook,
  screen,
  waitFor
} from "@testing-library/react";
import useEvent from "@testing-library/user-event";
import TitleEditButton from "@/components/elements/TitleEditButton";
import TextContent from "@/features/TextContent";
import ContentEditButton from "@/components/elements/ContentEditButton";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useTextDetail } from "@/common/hooks/useTextDetail";
import { SWRConfig } from "swr";

const server = setupServer(
  rest.get("http://localhost:3001/textDetail/:id", (req, res, ctx) => {
    const id = Number(req.params.id);
    return res(
      ctx.json({
        title: id,
        author: {
          id: 1,
          name: "msw1",
        },
        body: "msw1",
      }),
    );
  }),

  rest.put("http://localhost:3001/updateText/:id", async (req, res, ctx) => {
    const body = await req.json();
    const { title, content } = body;
    return res(
      ctx.json({
        title,
        content,
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const Wrapper = ({ children }: { children: any }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

describe("MainArea", () => {
  test("TextTitleのレンダリング", () => {
    render(<TextTitle textTitle="テスト" />);
    const titleElement = screen.getByRole("heading");
    expect(titleElement).toBeInTheDocument();
  });

  test("inputはレンダリングされていない", () => {
    render(<TextTitle textTitle="テスト" />);
    const inputElement = screen.queryByRole("textbox");
    expect(inputElement).not.toBeInTheDocument();
  });

  test("TitleEditButtonのレンダリング", () => {
    render(<TitleEditButton />);
    const titleEditButtonElement = screen.getByRole("button", {
      name: "Edit",
    });
    expect(titleEditButtonElement).toBeInTheDocument();
  });

  test("セーブボタンはレンダリングされていない", () => {
    render(<TitleEditButton />);
    const saveButtonElement = screen.queryByRole("button", {
      name: "Save",
    });
    expect(saveButtonElement).not.toBeInTheDocument();
  });

  test("キャンセルボタンはレンダリングされていない", () => {
    render(<TitleEditButton />);
    const cancelButtonElement = screen.queryByRole("button", {
      name: "Cancel",
    });
    expect(cancelButtonElement).not.toBeInTheDocument();
  });

  test("default-textareaのレンダリング", () => {
    const props = "テストです。";
    render(<TextContent textContent={props} />);
    const defaultTextareaElement = screen.getByTestId("default-textarea");
    expect(defaultTextareaElement).toBeInTheDocument();
  });

  test("editing-textareaのレンダリング", () => {
    const props = "テストです。";
    render(<TextContent textContent={props} />);
    const editingTextareaElement = screen.queryByTestId("editing-textarea");
    expect(editingTextareaElement).not.toBeInTheDocument();
  });
});

describe("interactions", () => {
  const user = useEvent.setup();
  test("TitleEditButtonをクリックすると編集モードのボタンとinputがレンダリングされる", async () => {
    render(<TitleEditButton />);
    render(<TextTitle textTitle="テストです。" />);
    const editButtonElement = screen.getByRole("button", {
      name: "Edit",
    });
    await user.click(editButtonElement);
    const saveButtonElement = screen.getByRole("button", {
      name: "Save",
    });
    const cancelButtonElement = screen.getByRole("button", {
      name: "Cancel",
    });
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(saveButtonElement).toBeInTheDocument();
    expect(cancelButtonElement).toBeInTheDocument();
  });

  test("inputへの入力", async () => {
    render(<TextTitle textTitle="テスト" />);
    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "です");
    expect(inputElement).toHaveValue("テストです");
  });

  test("ContentEditButtonをクリックすると編集モードのボタンとtextareaがレンダリングされる", async () => {
    render(<ContentEditButton />);
    render(<TextContent textContent="テストです。" />);
    const editButtonElement = screen.getByRole("button", {
      name: "Edit",
    });
    await user.click(editButtonElement);
    const saveButtonElement = screen.getByRole("button", {
      name: "Save",
    });
    const cancelButtonElement = screen.getByRole("button", {
      name: "Cancel",
    });
    const textareaElement = screen.getByTestId("editing-textarea");
    expect(textareaElement).toBeInTheDocument();
    expect(saveButtonElement).toBeInTheDocument();
    expect(cancelButtonElement).toBeInTheDocument();
  });

  test("textareaへの入力", async () => {
    render(<TextContent textContent="テスト" />);
    const textareaElement = screen.getByTestId("editing-textarea");
    await user.type(textareaElement, "です。");
    expect(textareaElement).toHaveValue("テストです。");
  });
});
