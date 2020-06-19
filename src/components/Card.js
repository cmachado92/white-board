import React, { useState, useContext } from "react";
import { Paper, Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import storeApi from "../utils/storeApi";
import ClickOutside from "../utils/ClickOutside";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    position: "relative",
  },
  updateCardField: {
    background: "#FFF3E0",
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
          {open ? (
            <ClickOutside onClick={() => setOpen(false)}>
              <Paper className={classes.updateCardField}>
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
                    onBlur={handleOnBlur}
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
  );
};
export default Card;
