import React from "react";
import { Paper, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";

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
export default function Card({ card, index }) {
  const classes = useStyle();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>
            <p className={classes.text}>{card.title}</p>
            <IconButton className={classes.removeCard}>
              <ClearIcon />
            </IconButton>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
