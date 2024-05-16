"use client";
import { Button } from "../ui/button";
import { useStore } from "@/common/store/store";
import SaveIcon from "../../../public/icons/save.svg";
import CancelIcon from "../../../public/icons/cancel.svg";
import EditIcon from "../../../public//icons/edit.svg";
import { useTextDetail } from "@/common/hooks/useTextDetail";
import { useTextList } from "@/common/hooks/useTextList";

const TitleEditButton = () => {
  const { titleEdit, toggleTitleEdit, textId, title } = useStore();
  const { detailTrigger } = useTextDetail(textId);
  const { mutate } = useTextList();

  const handleAppDate = async () => {
    const data = {
      title,
    };
    try {
      await detailTrigger(data);
      mutate();
      toggleTitleEdit(false);
    } catch (err) {
      console.error(err);
      window.alert(
        "タイトルの更新に失敗しました。しばらくしてからもう１度お試しください。",
      );
    }
  };

  return (
    <div>
      {titleEdit ? (
        <div className=" flex w-full justify-between">
          <Button
            variant="outline"
            color="blue"
            className=" bg-blue-400"
            onClick={() => handleAppDate()}
            name="Save"
          >
            <div className=" flex flex-col items-center">
              <SaveIcon />
              <span className=" text-xs text-white">Save</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className=" bg-gray-400"
            onClick={() => toggleTitleEdit(false)}
          >
            <div className=" flex flex-col items-center">
              <CancelIcon />
              <span className=" text-xs text-white">Cancel</span>
            </div>
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className=" bg-blue-400"
          size="lg"
          onClick={() => toggleTitleEdit(true)}
          data-testid="title-edit-button"
        >
          <div className=" flex flex-col items-center">
            <EditIcon />
            <span className="text-white">Edit</span>
          </div>
        </Button>
      )}
    </div>
  );
};

export default TitleEditButton;
