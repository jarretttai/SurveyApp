import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import styles from "../styles/QuestionStyle";


const useStyles = makeStyles(styles);


function RadioOption(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.radioOption}>
      <Grid item className={classes.radioNumber}>
        <Typography>{props.num}</Typography>
      </Grid>
      <Grid item>
        <RadioButtonUncheckedIcon />
      </Grid>
    </Grid>
  );
}


export default function ScaleQuestion (props) {


  const numbers = [1, 2, 3, 4, 5];
  
  return (

    <Grid container direction="row">
      {
        numbers.map((num, index) => (
          <Grid item key={index}>
            <RadioOption 
            num={num}
            />
          </Grid>
      ))}     
    </Grid>
  );
}
