"use client";
import { useTextList } from "@/common/hooks/useTextList";
import { TextContent } from "@/common/types/types";
import TitleCard from "../../features/TitleCard";

const TextList = () => {
  const { textList } = useTextList();

  return (
    <div className="flex-grow overflow-y-auto">
      {textList ? (
        textList.map((text: TextContent) => (
          <TitleCard textId={text.id} textTitle={text.title} key={text.id} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default TextList;
