import useSWR, { Fetcher } from "swr";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";
import { PatchFetcher, TextContent, TextDetail } from "../types/types";
import { instance } from "../../lib/axiosClient";

const getFetcher: Fetcher<TextDetail> = async (url: string) => {
  const response = await instance.get(url);
  return response.data;
};
const patchFetcher: PatchFetcher = async (url, { arg }) => {
  const response = await instance.put(url, arg);
  return response.data;
};

export const useTextDetail = (textId: number | null) => {
  const {
    data: textDetail,
    isLoading,
    error,
    mutate,
  } = useSWR(textId ? `/textDetail/${textId}` : null, getFetcher, {
    suspense: true,
  });

  const revalidate = useCallback(() => mutate(), [mutate]);

  const {
    trigger: detailTrigger,
    isMutating,
    error: mutateError,
  } = useSWRMutation(textId ? `/updateText/${textId}` : null, patchFetcher, {
    onSuccess: revalidate,
  });

  return {
    mutate,
    textDetail,
    revalidate,
    isLoading,
    error,
    detailTrigger,
    isMutating,
    mutateError,
  };
};
