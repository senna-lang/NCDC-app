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
];
