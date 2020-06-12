import React from "react";
import { Typography, Button, Avatar, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginLeft: "1%",
    color: "gray",
    flexGrow: 1,
  },
  appBar: {
    background: "hsla(0,0%,100%,.24)",
    width: "100%",
  },
  btn: {
    color: "#fff",
    background: "hsla(0,0%,100%,.24)",
  },
  large: {
    width: theme.spacing(35),
    height: theme.spacing(10),
    zoom: 0.5,
  },
}));

export default function TopBar({ setOpen }) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <Avatar
            variant="square"
            alt="Abax Consulting"
            src="http://abaxconsultingfm.com/assets/img/Asset%204.svg?h=1b22bb8f79982845d575abb5613a8488"
            className={classes.large}
          />
          <Typography className={classes.title}>- White Board</Typography>

          {/* <Button className={classes.btn} onClick={() => setOpen(true)}>
          Change Background
        </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
