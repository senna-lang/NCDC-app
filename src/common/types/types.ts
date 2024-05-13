export type Author = {
  id: number;
  name: string;
};
export type TextContent = {
  id: number;
  title: string;
  author: Author;
  body: string;
};

export type TextList = Pick<TextContent, "id" | "title">;

export type TextDetail = Pick<TextContent, "title" | "body" | "author"> | null;

export type PostFetcher = <T, U>(
  url: string,
  arg: {
    arg: T;
  },
) => Promise<U>;

export type PatchFetcher = <T, U>(
  url: string,
  arg: {
    arg: T;
  },
) => Promise<U>;
