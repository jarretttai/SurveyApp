import React from "react";
import { makeStyles, TextField } from "@material-ui/core";


import styles from "../styles/QuestionStyle";


const useStyles = makeStyles(styles);


export default function TextQuestion (props) {

  const classes = useStyles();
  
  return (
    <React.Fragment>
      <TextField 
      disabled
      label="Answer"
      variant="outlined"
      className={classes.answerInput}
      />
  </React.Fragment>
  )
}
