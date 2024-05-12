"use client";
import { useStore } from "@/common/store/store";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MultiSelect from "./MultiSelect";
import { useAuthor } from "@/common/hooks/useAuthor";
import RegisterAuthorForm from "@/features/RegisterAuthorForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "between",
  alignItems: "center",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AuthorModal = () => {
  const { authorModal, toggleAuthorModal } = useStore();
  const { authorList } = useAuthor();
  console.log(authorList);
  return (
    authorModal && (
      <Modal open={authorModal} onClose={() => toggleAuthorModal(false)}>
        <Box sx={style}>
          <MultiSelect authorList={authorList!} />
          <RegisterAuthorForm />
        </Box>
      </Modal>
    )
  );
};

export default AuthorModal;
