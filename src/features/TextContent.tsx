"use client";

import { useStore } from "@/common/store/store";

const TextContent = ({ textContent }: { textContent: string }) => {
  const { contentEdit, updateContent } = useStore();
  return (
    <div className="h-full overflow-y-auto rounded-lg bg-white p-5">
      <div className="h-full">
        {contentEdit ? (
          <textarea
            className="mb-5 h-full w-full"
            defaultValue={textContent}
            onChange={(e) => {
              e.preventDefault();
              updateContent(e.target.value);
            }}
          />
        ) : (
          <textarea
            disabled
            value={textContent}
            className=" mb-5 h-full w-full bg-white"
          />
        )}
      </div>
    </div>
  );
};

export default TextContent;
