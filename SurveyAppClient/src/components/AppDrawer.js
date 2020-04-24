import React from "react";
import { makeStyles, Drawer, List, ListItem, Divider, ListItemIcon, Typography } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText"
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import NotListedLocationOutlinedIcon from '@material-ui/icons/NotListedLocationOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";


import styles from "../styles/AppDrawerStyle";


const useStyles = makeStyles(styles);

function AppDrawer(props) {

  const classes = useStyles();


  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        open={props.open}
        onClose={props.handleDrawerClose}
        BackdropProps={{ invisible: true }}
        variant="temporary"
        anchor="left"
        classes={{
          paper: classes.drawerPaper
        }}
        // PaperProps={{ elevation: 10 }}
      >

        <div onClick={props.handleDrawerClose} >
          <List className={classes.drawerHeader}>
            <ListItem>
              <img src="/images/FutureSurvey.png" alt="logo" className={classes.logo} />
            </ListItem>
          </List>
          <Divider />
          <List className={classes.drawerBody}>
            <ListItem button>
              <PersonOutlineOutlinedIcon color="action" className={classes.listIcon} />
              <Typography variant="subtitle2" className={classes.listText}> Account </Typography>
            </ListItem>
            <ListItem button>
              <SettingsOutlinedIcon color="action" className={classes.listIcon} />
              <Typography variant="subtitle2" className={classes.listText}> Settings </Typography>
            </ListItem>
          </List>
          <Divider />
          <List className={classes.drawerBody}>
            <ListItem button>
              <NotListedLocationOutlinedIcon color="action" className={classes.listIcon} />
              <Typography variant="subtitle2" className={classes.listText}> Help & Feedback </Typography>
            </ListItem>
            <ListItem button>
              <InfoOutlinedIcon color="action" className={classes.listIcon} />
              <Typography variant="subtitle2" className={classes.listText}> About </Typography>
            </ListItem>
          </List>
        </div>

      </Drawer>
    </React.Fragment>
  );

}

export default AppDrawer;