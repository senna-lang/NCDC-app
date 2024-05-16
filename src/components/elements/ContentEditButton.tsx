"use client";
import { Button } from "../ui/button";
import { useStore } from "@/common/store/store";
import SaveIcon from "../../../public/icons/save.svg";
import CancelIcon from "../../../public/icons/cancel.svg";
import EditIcon from "../../../public/icons/edit.svg";
import { useTextDetail } from "@/common/hooks/useTextDetail";

const ContentEditButton = () => {
  const { contentEdit, toggleContentEdit, textId, content } = useStore();
  const { detailTrigger } = useTextDetail(textId);
  const data = {
    body: content,
  };
  const handleAppDate = () => {
    try {
      detailTrigger(data);
      toggleContentEdit(false);
    } catch (err) {
      console.error(err);
      window.alert("テキストの更新に失敗しました。しばらくしてからもう１度お試しください。");
    }
  };

  return (
    <div>
      {contentEdit ? (
        <div className=" flex w-full justify-between">
          <Button
            variant="outline"
            className=" bg-blue-400"
            onClick={() => handleAppDate()}
          >
            <div className=" flex flex-col items-center">
              <SaveIcon />
              <span className=" text-xs text-white">Save</span>
            </div>
          </Button>
          <Button
            variant="outline"
            className=" bg-gray-400"
            onClick={() => toggleContentEdit(false)}
          >
            <div className="flex flex-col items-center">
              <CancelIcon />
              <span className=" text-xs text-white">Cancel</span>
            </div>
          </Button>
        </div>
      ) : (
        <Button
          size="lg"
          className=" bg-blue-400"
          onClick={() => toggleContentEdit(true)}
          data-testid='cy:content-edit-button'
        >
          <div className=" flex flex-col items-center">
            <EditIcon />
            <span>Edit</span>
          </div>
        </Button>
      )}
    </div>
  );
};

export default ContentEditButton;
