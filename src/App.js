import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import List from "./components/List/List";
import store from "./utils/store";
import StoreApi from "./utils/storeApi";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import InputContainer from "./components/Input/InputContainer";
import { makeStyles, fade, useTheme } from "@material-ui/core/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TopBar from "./components/TopBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SideMenu from "./components/SideMenu";

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(https://www.hdwallpaper.nu/wp-content/uploads/2017/03/computer-14.jpg)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    overflowY: "auto",
  },
  removeCard: {
    bottom: "25px",
    width: "100%",
    position: "absolute",
    color: "#7D5252",
    "&:hover": {
      background: fade("#EE6B6B", 0.65),
    },
  },
  listContainer: {
    display: "flex",
  },
}));

export default function App() {
  const [data, setData] = useState(store);
  const [open, setOpen] = useState(false);
  //---delete props
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [typeToDelete, setTypeToDelete] = useState();
  const [idToDelete, setIdToDelete] = useState();
  const [typeDisplayText, setTypeDisplayText] = useState();
  //     confirmation Dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [backgroundUrl, setBackgroundUrl] = useState("");
  const classes = useStyle();
  const addMoreCard = (title, listId) => {
    console.log(title, listId);

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const addMoreList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    setData(newState);
  };

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const updateCardTitle = (title, listId, cardId) => {
    const list = data.lists[listId];
    const cards = list.cards;
    const card = cards.find((c) => c.id == cardId);

    card.title = title;
  };
  const onDragStart = (result) => {
    setShowDeleteButton(true);
  };
  const deleteElement = () => {
    //if dropped on delete button
    //----Delete Logic
    //is a task?
    if (typeToDelete === "list") {
      const newListIds = data.listIds;
      newListIds.splice(itemToDelete.index, 1);
      const newState = {
        ...data,
        lists: {
          ...data.lists,
        },
      };
      setData(newState);
      return;
    }
    //is a subtask?
    const sourceList = data.lists[itemToDelete.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === idToDelete
    )[0];
    sourceList.cards.splice(itemToDelete.index, 1);

    //update data
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [sourceList.id]: sourceList,
      },
    };
    setData(newState);
  };
  const showDialog = () => {
    setShowDelDialog(true);
  };
  const hideDialog = () => {
    setShowDelDialog(false);
  };
  const onDragEnd = (result) => {
    setShowDeleteButton(false);
    const { destination, source, draggableId, type } = result;
    // grab all data to delete if user confirms
    setItemToDelete(source);
    setTypeToDelete(type);
    setIdToDelete(draggableId);

    console.log("destination", destination, "source", source, draggableId);

    if (!destination) {
      return;
    }
    if (type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newSate = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      };
      setData(newSate);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
      setData(newState);
    }
  };

  return (
    <StoreApi.Provider
      value={{ addMoreCard, addMoreList, updateListTitle, updateCardTitle }}
    >
      <div
        className={classes.root}
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <TopBar setOpen={setOpen} />
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list" direction="horizontal">
            {(provided) => (
              <div
                className={classes.listContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.listIds.map((listId, index) => {
                  const list = data.lists[listId];
                  return <List list={list} key={listId} index={index} />;
                })}
                <InputContainer type="list" />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {showDeleteButton ? (
          <div>
            <Button
              id="deleteButton"
              onMouseUp={showDialog}
              className={classes.removeCard}
            >
              <DeleteIcon /> Delete
            </Button>
          </div>
        ) : (
          <div></div>
        )}
        {/* <SideMenu
          setBackgroundUrl={setBackgroundUrl}
          open={open}
          setOpen={setOpen}
        /> */}
        <Dialog
          fullScreen={fullScreen}
          open={showDelDialog}
          onClose={hideDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Delete Item"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={hideDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={hideDialog}
              onMouseUp={deleteElement}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </StoreApi.Provider>
  );
}
