import "@testing-library/jest-dom";
import { useAuthor } from "@/common/hooks/useAuthor";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { renderHook, waitFor, act } from "@testing-library/react";

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
          title: "msw2",
        },
      ]),
    );
  }),
  rest.post("http://localhost:3001/createAuthor", async (req, res, ctx) => {
    const body = await req.json();
    const { author } = body;
    return res(
      ctx.json({
        id: 1,
        author,
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

describe("useAuthor", () => {
  test("初回フェッチ", async () => {
    const { result } = renderHook(() => useAuthor(), {
      wrapper: Wrapper,
    });
    await waitFor(() => {
      expect(result.current.authorList).toHaveLength(2);
    });
  });

  test("mutateの動作確認", () => {
    const { result } = renderHook(() => useAuthor(),{
      wrapper: Wrapper,
    });
    act(() => {
      result.current.mutate([
        ...result.current.authorList!,
        { id: 3, name: "msw3" },
      ]);
    });
    expect(result.current.authorList).toHaveLength(3);
  });

  test("registerTriggerの動作確認", async () => {
    const { result } = renderHook(() => useAuthor(),{
      wrapper: Wrapper,
    });
    let registerTriggerResult;
    await act(async () => {
      registerTriggerResult = await result.current.registerTrigger("test");
    });
    expect(registerTriggerResult).toEqual({
      id: 1,
      author: "test",
    });
  });
});
