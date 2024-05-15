import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3001/authorList", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "msw1",
        },
        {
          id: 2,
          name: "msw2",
        },
        {
          id: 3,
          name: "msw3",
        },
      ]),
    );
  })
];
