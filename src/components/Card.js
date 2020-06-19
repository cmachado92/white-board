import React, { useState, useContext } from "react";
import { Paper, Typography, InputBase, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import storeApi from "../utils/storeApi";
import ClickOutside from "../utils/ClickOutside";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    position: "relative",
  },
  updateCardField: {
    background: "#FFF3E0",
  },
  updatedCardField: {
    background: "#7EEAB6",
  },
  text: {
    width: "90%",
  },
  removeCard: {
    position: "absolute",
    right: 5,
    top: "45%",
    width: "30px",
    height: "30px",
  },
}));
const Card = ({ card, index, listId }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const { updateCardTitle } = useContext(storeApi);
  const [isTitleUpdated, setIsTitleUpdated] = useState(false);

  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
    setIsTitleUpdated(true);
  };

  const handleOnBlur = () => {
    if (isTitleUpdated) updateCardTitle(newTitle, listId, card.id);
    setOpen(false);

    handleShowNotification();
    setIsTitleUpdated(false);
  };

  const handleShowNotification = () => {
    if (isTitleUpdated) setShowNotification(true);
  };
  const handleHideNotification = () => {
    setShowNotification(false);
  };
  return (
    <div>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {open ? (
              <ClickOutside onClick={handleOnBlur}>
                <Paper
                  className={
                    isTitleUpdated
                      ? classes.updatedCardField
                      : classes.updateCardField
                  }
                >
                  <div>
                    <InputBase
                      className={(classes.updateCardField, classes.card)}
                      onChange={handleOnChange}
                      autoFocus
                      fullWidth
                      multiline
                      value={newTitle}
                      inputProps={{
                        className: classes.input,
                      }}
                      fullWidth
                    />
                  </div>
                </Paper>
              </ClickOutside>
            ) : (
              <Paper className={classes.card}>
                <div>
                  <Typography
                    onClick={() => setOpen(!open)}
                    className={classes.editableTitle}
                  >
                    <p className={classes.text}>{card.title}</p>
                  </Typography>
                </div>
              </Paper>
            )}
          </div>
        )}
      </Draggable>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleHideNotification}
        message="Subtask updated"
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
};
export default Card;
