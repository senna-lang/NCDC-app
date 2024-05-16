"use client";
import { useStore } from "@/common/store/store";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useAuthor } from "@/common/hooks/useAuthor";
import DeleteIcon from "../../public/icons/delete.svg";
import { useRouter } from "next/navigation";
import { useTextList } from "@/common/hooks/useTextList";

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

const AuthorEditModal = () => {
  const { authorEditModal, toggleAuthorEditModal } = useStore();
  const { mutate } = useTextList();
  const { authorList, deleteTrigger } = useAuthor();

  const handleDelete = async (authorId: number) => {
    try {
      await deleteTrigger(authorId);
      mutate();
    } catch (e) {
      window.after("著者の削除に失敗しました。");
      console.error(e);
    } finally {
      toggleAuthorEditModal(false);
    }
  };
  return (
    authorEditModal && (
      <Modal
        data-testid="author-modal"
        open={authorEditModal}
        onClose={() => toggleAuthorEditModal(false)}
      >
        <Box sx={style}>
          <div className="mb-6 font-semibold">
            <h1>著者を編集</h1>
          </div>
          <ul>
            {authorList?.map((author) => (
              <li key={author.id}>
                <div className="mb-2 flex w-full justify-between gap-5 rounded-md border px-8 py-2">
                  <h2>{author.name}</h2>
                  <button
                    className="mr-2 block cursor-pointer"
                    data-testid="cy-author-delete-button"
                    onClick={() => handleDelete(author.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Box>
      </Modal>
    )
  );
};

export default AuthorEditModal;
