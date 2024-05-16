"use client";
import { useStore } from "@/common/store/store";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Selector from "../components/elements/Selector";
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
  return (
    authorModal && (
      <Modal
        data-testid="author-modal"
        open={authorModal}
        onClose={() => toggleAuthorModal(false)}
      >
        <Box sx={style}>
          <div className="mb-6 font-semibold">
            <h1>著者を選択</h1>
          </div>
          <Selector authorList={authorList!} />
          <RegisterAuthorForm />
        </Box>
      </Modal>
    )
  );
};

export default AuthorModal;
