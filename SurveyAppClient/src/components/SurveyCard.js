import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContentText, DialogContent, Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { Redirect } from 'react-router';


import styles from "../styles/SurveyCardStyle";


const useStyles = makeStyles(styles);

function SurveyCard(props) {

  const classes = useStyles();
  const [respCount, setRespCount] = useState(0);

  useEffect(() => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json;charset=UTF-8");
    const init = {
      method: 'GET',
      headers: headers
    };
    fetch(`/api/responses/count/${props.id}`, init)
      .then(res => res.json())
      .then(data => setRespCount(data[0]));
  }, []);

  const handleEdit = () => {props.jump(`/edit/${props.id}`);}

  const handleAnalysis = () => {props.jump(`/statistic/${props.id}`);}

  const handleSend = () => {props.openDialog(`${window.location.href}survey/${props.id}`);}

  const handleDelete = () => {}
  
  return (
    <React.Fragment>
      <Card className={classes.root} >
        <CardContent className={classes.content}>
          <Typography variant="h5">{props.name}</Typography>
          <div className={classes.details}>
            <Typography variant="subtitle2" className={classes.detailsItem}>
              ID: {props.id}
            </Typography>
            <Typography variant="subtitle2" className={classes.detailsItem}>
              Responses: {respCount}
            </Typography>
            <Typography variant="subtitle2" className={classes.detailsItem}>
              Date: {props.date}
            </Typography>
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <IconButton aria-label="Edit" onClick={handleEdit} className={classes.actionItem}>
            <EditRoundedIcon />
          </IconButton>
          <IconButton aria-label="Analysis" onClick={handleAnalysis} className={classes.actionItem}>
            <EqualizerRoundedIcon />
          </IconButton>
          <IconButton aria-label="Send" onClick={handleSend} className={classes.actionItem}>
            <SendRoundedIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={handleDelete} className={classes.actionItem}>
            <DeleteForeverRoundedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </React.Fragment>
  );


}

export default SurveyCard;