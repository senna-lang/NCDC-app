"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button } from "@mui/material";
import { useAuthor } from "@/common/hooks/useAuthor";

const RegisterAuthorForm = () => {
  const [author, setAuthor] = useState("");
  const { registerTrigger } = useAuthor();

  const registerAuthor = async () => {
    try {
      if (author === "") {
        window.alert("著者が入力されていません。");
        return;
      }
      await registerTrigger(author);
    } catch (e) {
      window.alert("著者の登録に失敗しました。");
      console.log(e);
    } finally {
      setAuthor("");
    }
  };

  return (
    <div className=" flex items-center gap-4">
      <TextField
        label="著者を追加"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        data-testid="cy-register-author-input"
      />
      <Button variant="outlined" onClick={() => registerAuthor()}>
        追加
      </Button>
    </div>
  );
};

export default RegisterAuthorForm;
