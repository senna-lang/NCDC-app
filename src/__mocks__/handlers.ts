import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3001/allTexts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          title: "テスト１",
          body: "テスト１です",
        },
        {
          title: "テスト2",
          body: "テスト2です",
        },
        {
          title: "テスト3",
          body: "テスト3です",
        },
      ]),
    );
  }),
];
