import React, { useState, useEffect } from 'react';

import Question from "../components/Question";
import { Grid, Typography, Button, Paper, makeStyles } from '@material-ui/core';
import { useCookies } from 'react-cookie';


export default function Survey(props) {

  const [cascade, setCascade] = useState([]); //记录被级联的问题id，在表里的不显示
  const [oldOptions, setOldOptions] = useState([]);//保存选项改变时的前一个值，从而恢复前一个值引发的级联状态变化
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState("");
  const [cookies] = useCookies();

  useEffect(() => {
    //检查是否登录
    if (cookies.mail==null) return props.history.replace("/login");

    let headers = new Headers();
    headers.append("Content-Type", "application/json;charset=UTF-8");
    const init = {
      method: 'GET',
      headers: headers
    };
    //fetch 获取 title
    fetch(`/api/title/${props.match.params.survid}`, init)
      .then(res => res.json())
      .then(data => setTitle(data[0]));
    //fetch 获取 questions
    fetch(`/api/questions/${props.match.params.survid}`, init)
      .then(res => res.json())
      .then(data => {
        //提取cascade表
        let cascade=[];
        for (let i=0; i<data.length; i++){
          if (data[i].type==="mc") {
            for (let j=0; j<data[i].options.length; j++) {
              if (data[i].options[j].cascadeQstnId)
                cascade.push(data[i].options[j].cascadeQstnId);
            }
          }
        }
        setCascade(cascade);
        setQuestions(data);
      });
  }, []);

  /**
   * front end test
   */
  console.log(answers);
  console.log(cascade);
  

  const isCascaded = qstnId => {
    for (let i=0; i<cascade.length; i++)
      if (cascade[i]===qstnId) return true;
    return false;
  }

  const updateOptAnswer = (index, optId) => {

    const ans = {
      respId: 0,
      formId: Number(props.match.params.survid),
      qstnId: questions[index].qstnId,
      content: questions[index].options[optId-1].content
    };
    let tempAns = answers.slice();
    tempAns[index] = ans;
    setAnswers(tempAns);
    //test
    console.log(answers);

    //旧选项如果有级联，则改变后将级联id加回级联状态表
    let cList = cascade.slice();
    if (oldOptions[index]) {
      let cId = questions[index].options[oldOptions[index]-1].cascadeQstnId;
      if (cId) {
        cList.unshift(cId);
        setCascade(cList);
      }
    }

    //更新旧选项表
    let old = oldOptions.slice();
    old[index] = optId;
    setOldOptions(old);

    //新的当前选项如果有级联，则在级联状态表删除掉所有该id
    let cId = questions[index].options[optId-1].cascadeQstnId;
    if (cId) {   
      for (let i=0; i<cList.length; i++) {
        if (cList[i] == cId) {
          cList.splice(i, 1);
          --i;
        }
      }
      setCascade(cList);
      console.log(cList);
    }
    console.log(oldOptions);
    console.log(cascade);
  }

  const updateAnswer = (index, ansCont) => {
    const ans = {
      respId: 0,
      formId: Number(props.match.params.survid),
      qstnId: questions[index].qstnId,
      content: ansCont
    };
    let tempAns = answers.slice();
    tempAns[index] = ans;
    setAnswers(tempAns);
    console.log(answers);
  }

  const handleSubmit = () => {
    let temp = answers.slice();
    //将因级联不显示的问题答案置为空
    for (let i=0; i<cascade.length; i++)
      temp[cascade[i]-1] = null;
    //将非空元素统一放入response数组中
    let response = [];
    for(let i of temp)
      i && response.push(i);
    
    console.log(response);

    let headers = new Headers();
    headers.append("Content-Type", "application/json;charset=UTF-8");
    const responseBody = JSON.stringify(response);
    const responseInit = {
      method: 'POST',
      headers: headers, 
      body: responseBody
    };
    fetch(`/api/response/${props.match.params.survid}`, responseInit)
      .then(res => res.json())
      .then(data => {
        console.log("post response: "+data);
        if (data==true) props.history.replace("/");
      }); 
  }

  return (
    <React.Fragment>
      <Grid container direction="column" alignItems="center" >
        <Grid item>
          <Paper elevation={3} style={{width: "45vw", margin: 24, paddingTop: 8, paddingBottom: 8}}>
            <Typography variant="h4" style={{margin: 16}}>
              {title}
            </Typography>
          </Paper>
        </Grid>
        {
          questions.map((q, index) => {
            if (isCascaded(q.qstnId)) return null;
            return (
              <Grid item key={index}>
                <Question 
                index={index}
                qInfo = {q}
                updateOptAnswer = {updateOptAnswer}
                update = {updateAnswer} />
              </Grid>
            );
          })
        }
        <Grid item>
          <Button
          variant = "contained"
          color = "primary"
          onClick = {handleSubmit} >
            Submit
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );

}