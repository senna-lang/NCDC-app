"use client";
import { useTextList } from "@/common/hooks/useTextList";
import type { TextList } from "@/common/types/types";
import TitleCard from "../../features/TitleCard";

const TextList = () => {
  const { textList } = useTextList();

  return (
    <div className="flex-grow overflow-y-auto">
      {textList ? (
        textList.map((text: TextList) => (
          <TitleCard textId={text.id} textTitle={text.title} key={text.id} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default TextList;
