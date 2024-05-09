import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import useEvent from "@testing-library/user-event";
import SideBar from "../components/layouts/SideBar";
import SvgrMock from "../__mocks__/SvgrMock";
import EditButton from "../components/elements/SidebarEditButton";
import TitleCard from "@/features/TitleCard";

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
  const TextList = [
    { id: 1, title: "テスト1です" },
    { id: 2, title: "テスト2です" },
    { id: 3, title: "テスト3です" },
  ];

  test("TitleCardのレンダリング", async () => {
    TextList.map((text) => {
      render(
        <TitleCard key={text.id} textId={text.id} textTitle={text.title} />,
      );
    });
    const textListElement = await screen.findAllByRole("listitem");
    expect(textListElement).toHaveLength(3);
  });

  test("TitleCardのタイトルのレンダリング", async () => {
    render(<TitleCard textId={TextList[0].id} textTitle={TextList[0].title} />);
    const textTitleElement = await screen.findByRole("heading");
    expect(textTitleElement).toBeInTheDocument();
  });

  test("DeleteButtonはレンダリングされていない", async () => {
    render(<TitleCard textId={TextList[0].id} textTitle={TextList[0].title} />);
    const deleteButtonElement = screen.queryByRole("button");
    expect(deleteButtonElement).not.toBeInTheDocument();
  });
});

describe("interactions", () => {
  test("EditButtonをクリックすると編集モードのボタンがレンダリングされる", async () => {
    const user = useEvent.setup();
    const textData = { id: 1, title: "テスト1です" };
    render(<EditButton />);
    render(<TitleCard textId={textData.id} textTitle={textData.title} />);
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
});
