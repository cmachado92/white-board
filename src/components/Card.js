import React, { useState, useContext } from "react";
import { Paper, IconButton, Typography, InputBase } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import storeApi from "../utils/storeApi";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    position: "relative",
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
  const [newTitle, setNewTitle] = useState(card.title);
  const { updateCardTitle } = useContext(storeApi);

  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnBlur = () => {
    updateCardTitle(newTitle, listId, card.id);
    setOpen(false);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>
            <div>
              {open ? (
                <div>
                  <InputBase
                    onChange={handleOnChange}
                    autoFocus
                    value={newTitle}
                    inputProps={{
                      className: classes.input,
                    }}
                    fullWidth
                    onBlur={handleOnBlur}
                  />
                </div>
              ) : (
                <div className={classes.editableTitleContainer}>
                  <Typography
                    onClick={() => setOpen(!open)}
                    className={classes.editableTitle}
                  >
                    <p className={classes.text}>{card.title}</p>
                  </Typography>
                </div>
              )}
            </div>

            <IconButton className={classes.removeCard}>
              <ClearIcon />
            </IconButton>
          </Paper>
        </div>
      )}
    </Draggable>
  );
};
export default Card;
