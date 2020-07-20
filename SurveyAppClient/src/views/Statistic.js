import React, { useEffect, useState } from 'react';
import {Toolbar, Grid, Paper, Typography, makeStyles} from '@material-ui/core';


import AppHeader from "../components/AppHeader";
import AppDrawer from "../components/AppDrawer";
import StatisticCard from "../components/StatisticCard";
import styles from "../styles/StatisticPageStyle";

const useStyles = makeStyles(styles);

export default function Statistic(props) {

  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = (e) => setDrawerOpen(true);
  const handleDrawerClose = e => setDrawerOpen(false);

  useEffect(() => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json;charset=UTF-8");
    const init = {
      method: 'GET',
      headers: headers
    };
    fetch(`/api/questions/${props.match.params.survid}`, init)
      .then(res => res.json())
      .then(data => setQuestions(data));
    fetch(`/api/title/${props.match.params.survid}`, init)
      .then(res => res.json())
      .then(data => setTitle(data));
  }, []);

  return (
    <React.Fragment>
      
      <AppHeader handleDrawerOpen={handleDrawerOpen} drawerOpen={drawerOpen} />
      <AppDrawer open={drawerOpen} handleDrawerClose={handleDrawerClose} />
      <Toolbar />

      <Grid container direction="column" alignItems="center" >
        <Grid item>
          <Paper className={classes.statisticTitle} elevation={3}>
            <Typography variant="h4">
              {title}
            </Typography>
          </Paper>
        </Grid>
        {
          questions?
          questions.map((q, index) => (
            <StatisticCard qInfo={q} key={index} />
          )):null
        }
      </Grid>
    </React.Fragment>
  );
}