import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";
import { Fetcher } from "swr";
import { PatchFetcher, PostFetcher, TextList } from "../types/types";
import { instance } from "../lib/axiosClient";

const getFetcher: Fetcher<TextList[]> = async (url: string) => {
  const response = await instance.get(url);
  return response.data;
};
const postFetcher: PostFetcher = async (url, { arg }) => {
  const response = await instance.post(url, arg);
  return response.data;
};
const deleteFetcher: PatchFetcher = async (url, { arg }) => {
  const addParamUrl = `${url}/${arg}`;
  const response = await instance.delete(addParamUrl);
  return response.data;
};

export const useTextList = () => {
  const {
    data: textList,
    isLoading,
    error,
    mutate,
  } = useSWR("allTexts", getFetcher);

  const revalidate = useCallback(() => mutate(), [mutate]);

  const {
    trigger: listTrigger,
    isMutating,
    error: mutateError,
  } = useSWRMutation("createText", postFetcher, {
    onSuccess: revalidate,
  });

  const { trigger: deleteTrigger } = useSWRMutation(
    "deleteText",
    deleteFetcher,
    {
      onSuccess: revalidate,
    },
  );

  return {
    mutate,
    textList,
    revalidate,
    isLoading,
    error,
    listTrigger,
    deleteTrigger,
    isMutating,
    mutateError,
  };
};
