import "@testing-library/jest-dom";
import { useTextDetail } from "@/common/hooks/useTextDetail";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { renderHook, waitFor, act } from "@testing-library/react";

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

describe("useTextDetail", () => {
  test("textDetailの動作確認", async () => {
    const { result, rerender } = renderHook(
      (textId) => useTextDetail(textId.textId),
      {
        wrapper: Wrapper,
        initialProps: { textId: 1 },
      },
    );
    rerender({ textId: 2 });
    await waitFor(() => {
      expect(result.current.textDetail).toEqual({
        title: 2,
        author: {
          id: 1,
          name: "msw1",
        },
        body: "msw1",
      });
    });
  });

  test("mutateの動作確認", async () => {
    const { result } = renderHook((textId) => useTextDetail(textId.textId), {
      wrapper: Wrapper,
      initialProps: { textId: 1 },
    });
    act(() => {
      result.current.mutate({
        title: "3",
        author: {
          id: 1,
          name: "msw1",
        },
        body: "msw3",
      });
    });
    expect(result.current.textDetail).toEqual({
      title: "3",
      author: {
        id: 1,
        name: "msw1",
      },
      body: "msw3",
    });
  });

  test("detailTriggerの動作確認", async () => {
    const { result } = renderHook((textId) => useTextDetail(textId.textId), {
      wrapper: Wrapper,
      initialProps: { textId: 1 },
    });
    const postData = {
      title: "test",
      content: "test",
    };
    let detailTriggerResult;
    await act(async () => {
      detailTriggerResult = await result.current.detailTrigger(postData);
    });
    expect(detailTriggerResult).toEqual({ ...postData });
  });
});
