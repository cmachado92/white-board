import React, { useState, useContext } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, fade } from "@material-ui/core/styles";
import storeApi from "../../utils/storeApi";
import ClickOutside from "../../utils/ClickOutside";

const useStyle = makeStyles((theme) => ({
  card: {
    width: "95%",
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
    background: "#FFF3E0",
    position: "relative",
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: "#1E88E5",
    color: "#fff",
    "&:hover": {
      background: fade("#64B5F6", 0.65),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));
export default function InputCard({ setOpen, listId, type }) {
  const classes = useStyle();
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState("");

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBtnConfirm = () => {
    if (type === "card") {
      addMoreCard(title, listId);
      setTitle("");
      setOpen(false);
    } else {
      addMoreList(title);
      setTitle("");
      setOpen(false);
    }
  };

  return (
    <ClickOutside onClick={() => setOpen(false)}>
      <div
      // onBlur={() => setOpen(false)}
      >
        <div>
          <Paper className={classes.card}>
            <InputBase
              autoFocus
              onChange={handleOnChange}
              multiline
              fullWidth
              inputProps={{
                className: classes.input,
              }}
              value={title}
              placeholder={
                type === "card"
                  ? "Enter a title for the subtask.."
                  : "Enter the task title..."
              }
            />
          </Paper>
        </div>
        <div className={classes.confirm}>
          <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
            {type === "card" ? "Add Subtask" : "Add Task"}
          </Button>
        </div>
      </div>
    </ClickOutside>
  );
}
