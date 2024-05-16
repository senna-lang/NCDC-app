"use client";
import { useStore } from "@/common/store/store";
import { Button } from "@mui/material";

const AuthorEditButton = () => {
  const { toggleAuthorEditModal } = useStore();
  return (
    <Button variant="outlined" onClick={() => toggleAuthorEditModal(true)}>
      著者一覧
    </Button>
  );
};

export default AuthorEditButton;
