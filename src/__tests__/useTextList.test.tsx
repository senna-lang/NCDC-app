import "@testing-library/jest-dom";
import { useTextList } from "@/common/hooks/useTextList";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import useSWR from "swr";

jest.mock("swr");

const mockedData = [
  {
    id: 1,
    title: "テスト１",
  },
  {
    is: 2,
    title: "テスト2",
  },
  {
    is: 3,
    title: "テスト3",
  },
];

describe("useTextList", () => {
  (useSWR as jest.Mock).mockReturnValue({
    data: mockedData,
  });
  const { result } = renderHook(() => useTextList());

  test("初回フェッチ", () => {
    expect(result.current.textList).toStrictEqual(mockedData);
  });
});
