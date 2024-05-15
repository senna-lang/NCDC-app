import "@testing-library/jest-dom";
import { useTextList } from "@/common/hooks/useTextList";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { renderHook, waitFor, act } from "@testing-library/react";

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
  rest.delete("http://localhost:3001/deleteText/:id", (req, res, ctx) => {
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
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const Wrapper = ({ children }: { children: any }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

describe("useTextList", () => {
  test("初回フェッチ", async () => {
    const { result } = renderHook(() => useTextList(), { wrapper: Wrapper });
    await waitFor(() => {
      expect(result.current.textList).toHaveLength(3);
    });
  });

  test("mutateの動作確認", () => {
    const { result } = renderHook(() => useTextList(), { wrapper: Wrapper });
    act(() => {
      result.current.mutate([{ id: 1, title: "テスト1" }]);
    });
    expect(result.current.textList).toEqual([{ id: 1, title: "テスト1" }]);
  });

  test("listTriggerの動作確認", async () => {
    const { result } = renderHook(() => useTextList(), { wrapper: Wrapper });
    let listTriggerResult;
    const postData = {
      title: "テスト",
      content: "テストです。",
      authorId: 1,
    };
    await act(async () => {
      listTriggerResult = await result.current.listTrigger(postData);
    });
    expect(listTriggerResult).toEqual({ ...postData, id: 1 });
  });

  test("deleteTriggerの動作確認", async () => {
    const { result } = renderHook(() => useTextList(), { wrapper: Wrapper });
    let deleteResult;
    await act(async () => {
      deleteResult = await result.current.deleteTrigger(1);
    });
    expect(deleteResult).toEqual({
      id: 1,
      title: "msw1",
    });
  });
});
