"use client";
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Author } from "@/common/types/types";
import { useTextList } from "@/common/hooks/useTextList";
import { useStore } from "@/common/store/store";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Selector({ authorList }: { authorList: Author[] }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const { toggleAuthorModal } = useStore();
  const { listTrigger } = useTextList();

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
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
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">著者</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {authorList.map((author) => (
            <MenuItem
              key={author.id}
              value={author.name}
              style={getStyles(author.name, personName, theme)}
              onClick={() => {
                createText(author.id);
              }}
            >
              {author.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
