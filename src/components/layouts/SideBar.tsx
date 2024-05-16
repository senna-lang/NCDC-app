import React from "react";
import TextList from "./TextList";
import EditButton from "../elements/SidebarEditButton";
import ServiceIcon from "../../../public/icons/logo.svg";
import AuthorEditButton from "../elements/AuthorEditButton";

const SideBar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white px-5">
      <div className="my-12 flex items-center justify-center">
        <div className=" mr-1 flex w-full items-center justify-around text-3xl font-bold">
          <ServiceIcon />
          <h1>ServiceName</h1>
        </div>
      </div>
      <TextList />
      <div className="w-full p-2 flex flex-col items-end">
        <AuthorEditButton />
      </div>
      <div className="w-full p-2">
        <EditButton />
      </div>
    </div>
  );
};

export default SideBar;
