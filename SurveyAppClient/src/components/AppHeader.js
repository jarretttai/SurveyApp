import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from '@material-ui/core/styles';
import { Toolbar, IconButton, Typography, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import NotificationsIcon from '@material-ui/icons/Notifications';
import grey from "@material-ui/core/colors/grey";


import styles from "../styles/AppHeaderStyle";

const useStyles = makeStyles(styles);

function AppHeader(props) {

  const classes = useStyles();

  return (
    <AppBar color="transparent" style={{boxShadow: 'none'}} >
      <Toolbar>
        <IconButton color={grey[600]} edge="start" onClick={props.handleDrawerOpen}>
          <MenuIcon id="drawer-button"/>
        </IconButton>
        <DescriptionRoundedIcon color="primary" className={classes.surveyIcon}/>
        <Typography variant="h5" color="textSecondary" className={classes.name}>FutureSurvey</Typography>
        <IconButton>
          <NotificationsIcon className="classes.notifIcon"/>
        </IconButton>
        <IconButton disableRipple style={{backgroundColor: 'transparent'}}>
          <Avatar className={classes.avatar}>D</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;