import React, {useState, useEffect} from "react";
import { makeStyles, Typography, Toolbar, Grid, Paper, TextField, Button } from "@material-ui/core";


import styles from "../styles/SurveyEditPageStyle";

import AppHeader from "../components/AppHeader";
import AppDrawer from "../components/AppDrawer";
import QuestionEdit from "../components/QuestionEdit";

const useStyles = makeStyles(styles);


export default function EditSurveyPage(props) {

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  //console.log(questions);

  useEffect(
    () => {
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
        .then(data => setTitle(data[0]));
    },
    []
  );

  const handleDrawerOpen = (e) => {
    setDrawerOpen(true);
  }
  
  const handleDrawerClose = e => {
    setDrawerOpen(false);
  }

  const updateTitle = e => {
    setTitle(e.target.value);
  }

  const addQuestion = e => {
    setQuestions([
      ...questions, 
      { 
        formId: parseInt(props.match.params.survid),
        qstnId: questions.length+1,
        type: 'mc', 
        content: '', 
        options: []
      }
    ]);
    console.log(questions);
  }

  const updateQuestion = (index, info) => {
    // console.log(index);
    // console.log(info);
    let newQuestions = questions.slice();
    newQuestions[index] = info;
    setQuestions(newQuestions);
    console.log(questions);
  }

  const deleteQuestion = (index) => {
    let newQuestions = questions.slice();
    newQuestions.splice(index, 1);
    for(let i=index; i<newQuestions.length; i++){
      newQuestions[i].qstnId--;
    }
    console.log(newQuestions);
    setQuestions(newQuestions);
  }

  const saveForm = e => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json;charset=UTF-8");
    const questionBody = JSON.stringify(questions);
    const questionInit = {
      method: 'POST',
      headers: headers, 
      body: questionBody
    };
    fetch(`/api/questions/${props.match.params.survid}`, questionInit)
      .then(res => res.json())
      .then(data => console.log("post questions: "+data));

    const titleBody = JSON.stringify(title);
    const titleInit = {
      method: 'POST',
      headers: headers,
      body: titleBody
    };
    fetch(`/api/title/${props.match.params.survid}`, titleInit)
    .then(res => res.json())
    .then(data => console.log("post title: "+data));

    console.log(questions);
    
  }

  //console.log(questions);

  return (
    <React.Fragment>

      <AppHeader handleDrawerOpen={handleDrawerOpen} drawerOpen={drawerOpen} />
      <AppDrawer open={drawerOpen} handleDrawerClose={handleDrawerClose} />
      <Toolbar />

      <Grid container direction="row" alignItems="flex-start">
        <Grid item sm={1} md={3}></Grid>
        <Grid item className={classes.saveButton} >
          <Button 
          variant="contained" 
          size="small" 
          color="primary"
          onClick={saveForm}>
            save
          </Button>
        </Grid>
        <Grid item className={classes.addButton} >
          <Button 
          onClick={addQuestion}
          variant="contained" 
          size="small" 
          color="primary">
            +  new question
          </Button> 
        </Grid>
        <Grid item sm={1} md={3}></Grid>
      </Grid>
      
      <Grid container direction="column" alignItems="center">
        <Grid item >
          <Paper className={classes.titlePaper} elevation={5}>
            <TextField 
            className={classes.title} 
            label="Title" 
            inputProps={{style: {fontSize: 30}}}
            InputLabelProps={{style: {fontSize: 20}}}
            onChange={updateTitle}
            value={title}/>
          </Paper>
        </Grid>
        <Grid item >
        {
          questions.map( 
            (q, index) => (
              <QuestionEdit 
              key={index} 
              index={index}
              qInfo={q} 
              update={updateQuestion}
              delete={deleteQuestion}/>
          ))
        }
        </Grid>
      </Grid>
      

    </React.Fragment>
  )

}