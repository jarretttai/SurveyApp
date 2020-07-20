import React, { useState, useEffect } from "react";
import { makeStyles, Paper, Grid, Select, MenuItem, TextField, IconButton, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

import styles from "../styles/QuestionStyle";
import McQuestion from "./McQuestion";
import CbQuestion from "./CbQuestion";
import TextQuestion from "./TextQuestion";
import NumQuestion from "./NumQuestion";
import ScaleQuestion from "./ScaleQuestion";


const useStyles = makeStyles(styles);


export default function QuestionEdit(props) {

  const classes = useStyles();
  const [info, setInfo] = useState(props.qInfo);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const handleClose = () => {
    setSelectorOpen(false);
  };

  const handleOpen = () => {
    setSelectorOpen(true);
  };

  const handleTypeChange = e => {
    let newInfo = info;
    newInfo['type'] = e.target.value;
    setInfo(newInfo);
    props.update(props.index, info);
  }

  const handleContChange = e => {
    let newInfo = info;
    newInfo['content'] = e.target.value;
    setInfo(newInfo);
    console.log(info);
    props.update(props.index, info);
  }

  const handleOptChange = options => {
    let newInfo = info;
    newInfo['options'] = options;
    setInfo(newInfo);
    props.update(props.index, info);
    // console.log(info['options']);
  }

  const addOptions = e => {
    let newInfo = info;
    newInfo['options'] = [
      ...info['options'], 
      {
        formId: props.qInfo.formId, 
        qstnId: props.qInfo.qstnId,
        optId: info['options'].length+1, 
        content: '',
        cascadeQstnId: ''
    }];
    setInfo(newInfo);
    console.log(info['options']);
    props.update(props.index, info);
  }

  const deleteQuestion = e => {
    props.delete(props.index);
  }

  const showButton = e => {
    if (info.type==="mc"||info.type==="cb"){
      return (
        <Button color="primary" onClick={addOptions} className={classes.optionAddButton}>
          Add Option
        </Button>
      );
    }
  }

  const getMainArea = () => {
    // console.log("inGETMAINAREA");
    // console.log(info);
    if (info.type==="mc") 
      return <McQuestion qInfo={info} updateOpt={handleOptChange}/>;
    else if (info.type==="cb")  
      return <CbQuestion qInfo={info} updateOpt={handleOptChange}/>;
    else if (info.type==="text")  
      return <TextQuestion qInfo={info} />;
    else if (info.type==="intNum" || info.type==="realNum")   
      return <NumQuestion qInfo={info} />;
    else if (info.type==="scale") 
      return <ScaleQuestion qInfo={info} />;
  }

  return (
    <React.Fragment>
      <Paper className={classes.questionPaper} elevation={5}>
        <Grid container direction="column">
          <Grid item container direction="row" alignItems="flex-start">
            <Grid item className={classes.mainArea}>
                <TextField
                label={"question "+(props.index+1)}
                variant="filled"
                onChange={handleContChange}
                className={classes.contentInput}
                value={props.qInfo.content} >
                </TextField>
            </Grid>
            <Grid item >
              <Select
              variant="outlined"
              className={classes.typeSelector}
              open={selectorOpen}
              onClose={handleClose}
              onOpen={handleOpen}
              value={props.qInfo.type}
              onChange={handleTypeChange}>
              <MenuItem value={"mc"}>Multiple Choice</MenuItem>
              <MenuItem value={"cb"}>Checkboxes</MenuItem>
              <MenuItem value={"text"}>Text</MenuItem>
              <MenuItem value={"intNum"}>Integer</MenuItem>
              <MenuItem value={"realNum"}>Real Number</MenuItem>
              <MenuItem value={"scale"}>Linear Scale</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid item>
            {getMainArea()}
          </Grid>
          <Grid item container direction="row">
            <Grid item style={{flexGrow: 1}}>
              {showButton()}
            </Grid>
            <Grid item className={classes.deleteQuestionButton}>
              <IconButton onClick={deleteQuestion}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        
      </Paper>
      
        
    </React.Fragment>
  )

}

