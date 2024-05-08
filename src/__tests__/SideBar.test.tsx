import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SideBar from "../components/layouts/SideBar";
import SvgrMock from "../__mocks__/SvgrMock";
import EditButton from "../components/elements/SidebarEditButton";
import TitleCard from "@/features/TitleCard";

describe("SideBarElements", () => {
  test("ServiceNameをレンダリングする", () => {
    render(<SideBar />);
    const headingText = screen.getByText("ServiceName");
    expect(headingText).toBeInTheDocument();
  });

  test("EditButtonをレンダリングする", () => {
    render(<EditButton />);
    const editButton = screen.getByRole("button", {
      name: "Edit",
    });
    expect(editButton).toBeInTheDocument();
  });

  test("DoneButtonはレンダリングされていない", () => {
    render(<EditButton />);
    const doneButton = screen.queryByRole("button", {
      name: "Done",
    });
    expect(doneButton).not.toBeInTheDocument();
  });

  test("NewPageButtonはレンダリングされていない", () => {
    render(<EditButton />);
    const doneButton = screen.queryByRole("button", {
      name: "New page",
    });
    expect(doneButton).not.toBeInTheDocument();
  });

  test("SVGコンポーネントをレンダリングする", () => {
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
