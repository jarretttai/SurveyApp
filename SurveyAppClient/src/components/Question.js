import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, Typography, Grid, RadioGroup, Radio, FormControl, FormControlLabel, Checkbox, Slider, TextField} from '@material-ui/core';


import styles from "../styles/QuestionStyle";

const useStyles = makeStyles(styles);

export default function Question(props) {

  const classes = useStyles();
  const [value, setValue] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [checked, setChecked] = useState(() => {
    if (props.qInfo.type==="cb") {
      let cb = [];
      for(let i=0; i<props.qInfo.options.length; i++) {
        cb = [...cb, false];
      }
      return cb;
    }
  });
  
  // console.log(value);
  // console.log(props.qInfo);
  
  useEffect(() => {

  }, []);

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
    props.updateOptAnswer(props.index, Number(e.target.value));
  }

  const handleCbChange = (e) => {
    let cb = checked.slice();
    cb[e.target.value] = !cb[e.target.value];
    setChecked(cb);
    let ans = "";
    for (let i=0; i<cb.length; i++)
      if (cb[i]==true) 
        ans = ans + "&" + props.qInfo.options[i].content;
    props.update(props.index, ans);
  }

  const handleSliderChange = (e, value) => {
    console.log(value);
    props.update(props.index, value.toString());
  }

  const handleNormalChange = (e) => {
    props.update(props.index, e.target.value);
  }

  const displayMainArea = () => {
    if (props.qInfo.type==="mc") {
      return (
        <FormControl component="fieldset" >
        <RadioGroup onChange={handleRadioChange} value={radioValue.toString()}>
          {
            props.qInfo.options.map((opt, index) => (
              <FormControlLabel 
              value={opt.optId.toString()} 
              control={<Radio color="primary" />} 
              label={opt.content}
              key={index} />
            ))
          }
        </RadioGroup>
        </FormControl>
      );
    }
    else if (props.qInfo.type==="cb") {
      return (
        <FormControl>
          {
            props.qInfo.options.map((opt, index) => {
              return (
              <FormControlLabel 
              control={<Checkbox checked={checked[index]} onChange={handleCbChange} color="primary" />}
              label={opt.content} 
              value={index}
              key={index} />);
            })
          }
        </FormControl>
      );
    }
    else if (props.qInfo.type==="scale") {
      return (
        <Slider 
        onChange={handleSliderChange}
        defaultValue={4}
        min={0}
        max={5}
        step={1}
        marks 
        valueLabelDisplay="auto"
        style={{width: "40vw"}} />
      );
    }
    else if (props.qInfo.type==="text"){
      return (
        <TextField  
        multiline
        variant="outlined"
        label="" 
        onBlur={handleNormalChange} 
        />
      );
    }
    else if (props.qInfo.type==="intNum"||props.qInfo.type==="realNum"){
      return (
        <TextField 
        variant="standard"
        type="number"
        onBlur={handleNormalChange} />
      );
    }
  }

  return (
    <React.Fragment> 
      <Paper className={classes.questionPaper} elevation={3}>
        <Grid container direction="column" alignItems="flex-start" >
          <Grid item className={classes.questionArea}>
            <Typography variant="subtitle2" style={{fontWeight: 600}}> 
              {`Q${props.qInfo.qstnId}: ${props.qInfo.content}`} 
            </Typography>
          </Grid>
          <Grid item className={classes.answerArea}>
            {displayMainArea()}
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );

}