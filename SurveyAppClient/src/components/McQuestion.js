import React, { useState, useEffect } from "react";
import { makeStyles, Grid, TextField, Button, IconButton } from "@material-ui/core";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';

import styles from "../styles/QuestionStyle";


const useStyles = makeStyles(styles);


function Option(props) {

  const classes = useStyles();

  // const [opt, setOpt] = useState(props.option);


  // useEffect(() => {
  //   setOpt(props.option);
  // })

  const deleteItself = e => {
    props.deleteOption(props.index, e);
  }

  const handleNameChange = e => {
    let newOpt = props.option;
    newOpt['content'] = e.target.value;
    props.updateOption(props.index, newOpt);
  }

  const handleJumpIndexChange = e => {
    let newOpt = props.option;
    // newOpt['cascadeIndex'] = e.target.value;
    newOpt['cascadeQstnId'] = e.target.value;
    props.updateOption(props.index, newOpt);
  }

  return (  
    <Grid container direction="row" >
      <Grid item>
        <RadioButtonUncheckedIcon className={classes.optionIcon} />
      </Grid>
      <Grid item>
        <TextField 
        label={"option "+(props.index+1)}
        value={props.option.content}
        onChange={handleNameChange}
        className={classes.optionInput}
        InputLabelProps={{
          shrink: true,
        }}
        />
      </Grid>
      <Grid item>
        <TextField
          label="jump to"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleJumpIndexChange}
          className={classes.cascadeInput}
          // value={props.option.cascadeIndex}
          value={props.option.cascadeQstnId?props.option.cascadeQstnId:''}
        />
      </Grid>
      <Grid item>
        <IconButton onClick={deleteItself} className={classes.optionDelete}>
          <ClearIcon  />
        </IconButton>
      </Grid>
    </Grid>
  );
}

//multi choices
export default function McQuestion (props) {

  const updateOptions = (index, opt) => {
    let newOptions = props.qInfo.options.slice();
    newOptions[index] = opt;
    props.updateOpt(newOptions);
  }

  const deleteOptions = (index, e) => {
    let newOptions = props.qInfo.options.slice();
    newOptions.splice(index, 1);
    for(let i=index; i<newOptions.length; i++) {
      newOptions[i].optId--;
    }
    props.updateOpt(newOptions);
  }

  // console.log(props.qInfo.options);
  return (
    <React.Fragment>
      {
        props.qInfo.options.map( (opt, index) => (
          <Option 
          key={index} 
          index={index} 
          option={opt} 
          updateOption={updateOptions}
          deleteOption={deleteOptions}
          />
          ))
      }
    </React.Fragment>
  );
}

