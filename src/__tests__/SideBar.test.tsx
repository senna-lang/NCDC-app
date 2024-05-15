import "@testing-library/jest-dom";
import {
  queryByRole,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import useEvent, { userEvent } from "@testing-library/user-event";
import SideBar from "../components/layouts/SideBar";
import SvgrMock from "../mocks/SvgrMock";
import EditButton from "../components/elements/SidebarEditButton";
import TitleCard from "@/features/TitleCard";
import TextTitle from "@/features/TextTitle";
import TextListLayout from "@/components/layouts/TextList";
import { useTextList } from "@/common/hooks/useTextList";
import { SWRConfig } from "swr";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { use } from "react";

const server = setupServer(
  rest.get("http://localhost:3001/allTexts", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: "msw1",
        },
        {
          id: 2,
          title: "msw2",
        },
        {
          id: 3,
          title: "msw3",
        },
      ]),
    );
  }),
  rest.delete("http://localhost:3001//deleteText/:id", (req, res, ctx) => {
    const id = Number(req.params.id);
    return res(
      ctx.json({
        id,
        title: `msw${id}`,
      }),
    );
  }),
  rest.post("http://localhost:3001/createText", async (req, res, ctx) => {
    const body = await req.json();
    const { title, content, authorId } = body;
    return res(
      ctx.json({
        id: 1,
        title,
        content,
        authorId,
      }),
    );
  }),
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

describe("SideBarElements", () => {
  test("ServiceNameのレンダリング", () => {
    render(<SideBar />);
    const headingTextElement = screen.getByText("ServiceName");
    expect(headingTextElement).toBeInTheDocument();
  });
  test("EditButtonのレンダリング", () => {
    render(<EditButton />);
    const editButtonElement = screen.getByRole("button", {
      name: "Edit",
    });
    expect(editButtonElement).toBeInTheDocument();
  });
  test("DoneButtonはレンダリングされていない", () => {
    render(<EditButton />);
    const doneButtonElement = screen.queryByRole("button", {
      name: "Done",
    });
    expect(doneButtonElement).not.toBeInTheDocument();
  });
  test("NewPageButtonはレンダリングされていない", () => {
    render(<EditButton />);
    const newPageButtonElement = screen.queryByRole("button", {
      name: "New page",
    });
    expect(newPageButtonElement).not.toBeInTheDocument();
  });
  test("SVGコンポーネントのレンダリング", () => {
    const { getByTestId } = render(
      <SvgrMock data-testid="svg-mock" width={100} height={100} />,
    );
    const svgElement = getByTestId("svg-mock");
    expect(svgElement).toBeInTheDocument();
  });
});

describe("TextList", () => {
  test("TitleCardのレンダリング", async () => {
    const { result } = renderHook(() => useTextList(), { wrapper: Wrapper });
    result.current.textList?.map((text) => {
      render(<TitleCard textId={text.id} textTitle={text.title} />);
    });
    const textListElement = await screen.findAllByRole("listitem");
    await waitFor(() => {
      expect(textListElement).toHaveLength(3);
    });
  });

  test("TitleCardのタイトルのレンダリング", async () => {
    render(<TitleCard textId={1} textTitle="test" />);
    const textTitleElement = await screen.findByRole("heading");
    expect(textTitleElement).toBeInTheDocument();
  });

  test("DeleteButtonはレンダリングされていない", async () => {
    render(<TitleCard textId={1} textTitle="test" />);
    const deleteButtonElement = screen.queryByRole("button");
    expect(deleteButtonElement).not.toBeInTheDocument();
  });
});

describe("interaction", () => {
  const user = userEvent.setup();
  test("EditButtonをクリックすると編集モードのボタンがレンダリングされる", async () => {
    render(<EditButton />);
    render(<TitleCard textId={1} textTitle="test" />);
    const editButtonElement = screen.getByRole("button", {
      name: "Edit",
    });
    await user.click(editButtonElement);
    const doneButtonElement = screen.getByRole("button", {
      name: "Done",
    });
    const newPageButtonElement = screen.getByRole("button", {
      name: "New page",
    });
    const deleteButtonElement = screen.getByTestId("delete-button");
    expect(deleteButtonElement).toBeInTheDocument();
    expect(doneButtonElement).toBeInTheDocument();
    expect(newPageButtonElement).toBeInTheDocument();
  });
  test("TitleCardをクリックするとタイトルとコンテンツが更新される", async () => {
    render(<TitleCard textId={1} textTitle="test" />);
    render(<TextTitle textTitle="テスト" />);
    const cardElement = screen.getByRole("listitem");
    await user.click(cardElement);
    const titleElement = screen.getByRole("heading", {
      name: "test",
    });
    expect(titleElement).toBeInTheDocument();
  });
});
