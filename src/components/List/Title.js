import React, { useState, useContext } from "react";
import { Typography, InputBase, Paper, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ColorLens from "@material-ui/icons/ColorLens";
import storeApi from "../../utils/storeApi";
import ClickOutside from "../../utils/ClickOutside";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import ColorPicker from "../../utils/ColorPicker";

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
  const { updateListColor } = useContext(storeApi);
  const [isTitleUpdated, setIsTitleUpdated] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [colorDialogElement, setColorDialogElement] = useState(null);
  const [color, setColor] = useState();

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

  const handleColorDialogClick = (e) => {
    setColorDialogElement(e.currentTarget);
  };
  const handleColorDialogClose = () => {
    console.log("Color Final:" + color);
    setColorDialogElement(null);
    updateListColor(color, listId);
  };

  const handleShowNotification = () => {
    if (isTitleUpdated) setShowNotification(true);
  };
  const handleHideNotification = () => {
    setShowNotification(false);
  };
  const handleOnKeyDown = (e) => {
    if (e.charCode === 13) {
      if (isTitleUpdated) {
        handleShowNotification();
        updateListTitle(newTitle, listId);
        setIsTitleUpdated(false);
      }
      setOpen(false);
    }
  };

  const openDialog = Boolean(colorDialogElement);
  const id = open ? "simple-popover" : undefined;

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
          <IconButton aria-describedby={id} onClick={handleColorDialogClick}>
            <ColorLens />
          </IconButton>
        </div>
      )}
      {
        //---------NOTIFICATIONS----------}
      }
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
      {
        //------COLOR PICKER-------------
      }
      <Popover
        id={id}
        open={openDialog}
        anchorEl={colorDialogElement}
        onClose={handleColorDialogClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ColorPicker color={color} setColor={setColor}></ColorPicker>
      </Popover>
    </div>
  );
}
