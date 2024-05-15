import useSWR, { Fetcher } from "swr";
import { instance } from "../lib/axiosClient";
import { Author } from "../types/types";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";

const getFetcher: Fetcher<Author[]> = async (url: string) => {
  const response = await instance.get(url);
  return response.data;
};
const postFetcher = async (url: string, { arg }: { arg: string }) => {
  const response = await instance.post(url, { author: arg });
  return response.data;
};

export const useAuthor = () => {
  const {
    data: authorList,
    isLoading,
    error,
    mutate,
  } = useSWR("authorList", getFetcher);

  const revalidate = useCallback(() => mutate(), [mutate]);

  const {
    trigger: registerTrigger,
    isMutating,
    error: registerError,
  } = useSWRMutation("createAuthor", postFetcher, {
    onSuccess: revalidate,
  });

  return {
    authorList,
    isLoading,
    error,
    mutate,
    registerTrigger,
    isMutating,
    registerError,
  };
};
