"use client";
import { useTextList } from "@/common/hooks/useTextList";
import type { TextList } from "@/common/types/types";
import TitleCard from "../../features/TitleCard";

const TextListLayout = () => {
  const { textList } = useTextList();

  return (
    <div className="flex-grow overflow-y-auto">
      <ul>
        {textList ? (
          textList.map((text: TextList) => (
            <TitleCard textId={text.id} textTitle={text.title} key={text.id} />
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default TextListLayout;
