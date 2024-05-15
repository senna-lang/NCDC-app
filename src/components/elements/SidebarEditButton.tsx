"use client";
import { Button } from "../ui/button";
import { useStore } from "@/common/store/store";
import AddIcon from "../../../public/icons/+.svg";
import CheckIcon from "../../../public/icons/done.svg";
import EditIcon from "../../../public//icons/edit.svg";

const EditButton = () => {
  const { sidebarEdit, toggleSidebarEdit, toggleAuthorModal } = useStore();

  return (
    <div>
      {sidebarEdit ? (
        <div className=" flex w-full justify-between">
          <Button
            className=" border-blue-400"
            size="lg"
            variant="outline"
            onClick={() => toggleAuthorModal(true)}
            data-testid='cy-newPage-button'
          >
            <div className=" flex flex-col items-center">
              <AddIcon />
              <span className=" text-blue-400">New page</span>
            </div>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className=" bg-blue-400"
            onClick={() => toggleSidebarEdit(false)}
          >
            <div className=" flex flex-col items-center">
              <CheckIcon />
              <span className=" text-white">Done</span>
            </div>
          </Button>
        </div>
      ) : (
        <div className=" flex w-full justify-end">
          <Button
            variant="outline"
            className=" bg-blue-400"
            size="lg"
            onClick={() => toggleSidebarEdit(true)}
            data-testid="cy-sidebar-edit"
          >
            <div className=" flex flex-col items-center">
              <EditIcon />
              <span className="text-white">Edit</span>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditButton;
