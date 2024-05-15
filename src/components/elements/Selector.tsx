"use client";

import { Author } from "@/common/types/types";
import { useTextList } from "@/common/hooks/useTextList";
import { useStore } from "@/common/store/store";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Selector({ authorList }: { authorList: Author[] }) {
  const [author, setAuthor] = useState("");
  const { toggleAuthorModal } = useStore();
  const { listTrigger } = useTextList();

  const handleChange = (event: SelectChangeEvent) => {
    setAuthor(event.target.value as string);
  };

  const createText = async (authorId: number) => {
    const data = {
      title: "タイトル",
      body: "コンテンツ",
      authorId,
    };
    try {
      await listTrigger(data);
    } catch (err) {
      console.log(err);
      window.alert(
        "テキストの作成に失敗しました。しばらくしてからもう１度お試しください。",
      );
    } finally {
      toggleAuthorModal(false);
    }
  };

  return (
    <Box sx={{ minWidth: 250, paddingBottom: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">著者</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={author}
          label="author"
          fullWidth
          onChange={handleChange}
        >
          {authorList.map((author) => (
            <MenuItem value={author.name} key={author.id} onClick={() => createText(author.id)}>
              {author.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
