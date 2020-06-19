import React, { useState, useContext } from "react";
import { Typography, InputBase, Paper, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import storeApi from "../../utils/storeApi";
import ClickOutside from "../../utils/ClickOutside";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex",
  },
  updateCardField: {
    background: "#FFF3E0",
  },
  updatedCardField: {
    background: "#7EEAB6",
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: theme.spacing(1),
  },
}));
export default function Title({ title, listId }) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateListTitle } = useContext(storeApi);
  const [isTitleUpdated, setIsTitleUpdated] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const classes = useStyle();
  const handleOnChange = (e) => {
    setIsTitleUpdated(true);
    setNewTitle(e.target.value);
  };

  const handleOnBlur = () => {
    if (isTitleUpdated) {
      handleShowNotification();
      updateListTitle(newTitle, listId);
      setIsTitleUpdated(false);
    }
    setOpen(false);
  };

  const handleShowNotification = () => {
    if (isTitleUpdated) setShowNotification(true);
  };
  const handleHideNotification = () => {
    setShowNotification(false);
  };
  const handleOnKeyDown = (e) => {
    if (e.charCode == 13) {
      if (isTitleUpdated) {
        handleShowNotification();
        updateListTitle(newTitle, listId);
        setIsTitleUpdated(false);
      }
      setOpen(false);
    }
  };
  return (
    <div>
      {open ? (
        <div>
          <ClickOutside onClick={handleOnBlur}>
            <Paper
              className={
                isTitleUpdated
                  ? classes.updatedCardField
                  : classes.updateCardField
              }
            >
              <InputBase
                onChange={handleOnChange}
                onKeyPress={handleOnKeyDown}
                autoFocus
                value={newTitle}
                inputProps={{
                  className: classes.input,
                }}
                fullWidth
              />
            </Paper>
          </ClickOutside>
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {title}
          </Typography>
          <MoreHorizIcon />
        </div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleHideNotification}
        message="Task updated"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleHideNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
