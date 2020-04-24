import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper, makeStyles, Toolbar, Card, CardMedia } from "@material-ui/core";

import AppHeader from "../components/AppHeader";
import AppDrawer from "../components/AppDrawer";
// import AppNav from "../components/AppNav";
import styles from "../styles/HomeStyle";

const useStyles = makeStyles(styles);


export default function Home() {

  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);


  const handleDrawerOpen = (e) => {
    setDrawerOpen(true);
  }

  const handleDrawerClose = e => {
    setDrawerOpen(false);
  }

  return (
    <React.Fragment>

      <AppHeader handleDrawerOpen={handleDrawerOpen} drawerOpen={drawerOpen} />
      <AppDrawer open={drawerOpen} handleDrawerClose={handleDrawerClose} />
      <Toolbar />

    <Grid 
      container 
      direction="column" 
      alignItems="center" 
      spacing={2} 
      className={classes.mainArea}
    >
      <Grid item>
        <Paper>This is main area</Paper>
      </Grid>
      <Grid item lg={8} md={8}>
        <Paper >
          This is main area This is main area This is main areaThis is main area This is main area
        This is main areaThis is main areaThis is main areaThis is main area This is main areaThis is 
        main areaThis is main area This is main areaThis is main areaThis is main area This is main area
        </Paper>
      </Grid>
      <Grid item>
        
      </Grid>
    </Grid>
    </React.Fragment>
  );
} 
