import useSWR, { Fetcher } from "swr";
import { instance } from "../lib/axiosClient";
import { Author, PatchFetcher, PostFetcher } from "../types/types";
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
const deleteFetcher: PatchFetcher = async (url, { arg }) => {
  const addParamUrl = `${url}/${arg}`;
  const response = await instance.delete(addParamUrl);
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

  const {
    trigger: deleteTrigger,
    isMutating: deleteIsMutating,
    error: deleteError,
  } = useSWRMutation("deleteAuthor", deleteFetcher, {
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
    deleteError,
    deleteIsMutating,
    deleteTrigger
  };
};
