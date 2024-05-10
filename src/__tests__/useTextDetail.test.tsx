import useSWR from "swr";
import { renderHook } from "@testing-library/react";
import { useTextDetail } from "@/common/hooks/useTextDetail";

jest.mock("swr");

const mockedData = [
  {
    id: 1,
    title: "テスト１",
    body: "テスト１です。",
  },
  {
    id: 2,
    title: "テスト2",
    body: "テスト２です。",
  },
  {
    id: 3,
    title: "テスト3",
    body: "テスト３です。",
  },
];

describe("useTextList", () => {
  (useSWR as jest.Mock).mockReturnValue({
    data: mockedData,
  });
  const { result } = renderHook(() => useTextDetail(1));

  test("テキスト詳細の取得", () => {
    expect(result.current.textDetail).toStrictEqual(mockedData);
  });


});
