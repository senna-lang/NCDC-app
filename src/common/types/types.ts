export type TextContent = {
  id: number;
  title: string;
  body: string;
};

export type TextList = Pick<TextContent, "id" | "title">;

export type TextDetail = Pick<TextContent, "title" | "body"> | null;

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
