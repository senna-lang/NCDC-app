"use client";
import { useTextDetail } from "@/common/hooks/useTextDetail";
import { useStore } from "@/common/store/store";
import TextTitle from "../../features/TextTitle";
import TextContent from "../../features/TextContent";
import ContentEditButton from "../elements/ContentEditButton";
import TitleEditButton from "../elements/TitleEditButton";

const MainArea = () => {
  const { textId } = useStore();
  const { textDetail } = useTextDetail(textId);
  return (
    <div className="flex h-screen flex-col bg-slate-100 p-6">
      {textDetail ? (
        <>
          <div className=" flex w-full justify-between">
            <div className=" w-5/6">
              <TextTitle textTitle={textDetail.title} />
            </div>
            <div className=" w-1/6">
              <div className=" flex w-full justify-end">
                <TitleEditButton />
              </div>
            </div>
          </div>
          <div className=" flex flex-grow justify-between">
            <div className=" w-5/6">
              <TextContent textContent={textDetail.body} />
            </div>
            <div className=" w-1/6">
              <div className=" flex w-full justify-end">
                <ContentEditButton />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainArea;
