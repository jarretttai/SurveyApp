import React, { useState, useEffect } from "react";
import { Typography, Paper, makeStyles, Box } from "@material-ui/core";
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Legend, Tooltip, } from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { ValueScale } from "@devexpress/dx-react-chart";
import { scaleLog } from 'd3-scale';

import styles from "../styles/StatisticPageStyle";


const useStyles = makeStyles(styles);

export default function StatisticCard(props) {

  const classes = useStyles();
  const [data, setData] = useState([]);

  const scale = {

  }

  useEffect(() => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json;charset=UTF-8");
    const init = {
      method: 'GET',
      headers: headers
    };
    const url = `/api/statistics/${props.qInfo.type}/${props.qInfo.formId}/${props.qInfo.qstnId}`;
    fetch(url, init)
      .then(res => res.json())
      .then(res => {
        console.log(props.qInfo.qstnId+': '+res); 
        if (props.qInfo.type==="mc" || props.qInfo.type==="cb") {
          let stats = [];
          for (let i=0; i<res.length; i++) {
            stats[i] = {content: props.qInfo.options[i].content, count: res[i]};
          }
          setData(stats);
        }
        else if (props.qInfo.type==="scale") {
          let stats = [];
          for (let i=0; i<res.length; i++) {
            stats[i] = {content: i.toString(), count: res[i]};
          }
          setData(stats);
        }
        else {
          setData(res);
        }

    });
  }, []);

  const getStatistics = () => {
    if (props.qInfo.type==="mc" || props.qInfo.type==="cb") {
      return (
        <Chart data={data} className={classes.chart} height="200" >
          <ValueScale modifyDomain={domain=>[domain[0], domain[1]*4]} />
          <ArgumentAxis />
          <ValueAxis showGrid={false} showLine showTicks />
          <BarSeries  
            name="options"
            valueField="count"
            argumentField="content"
          />
          <Legend />
          <EventTracker />
          <Tooltip />
        </Chart>
      );
    }
    else if (props.qInfo.type==="intNum"||props.qInfo.type==="realNum") {
      return (
        <React.Fragment>
          <Box className={classes.answerBox} borderRadius={10}>
            <Typography>{`Max: ${data.max}`}</Typography>
          </Box>
          <Box className={classes.answerBox} borderRadius={10}>
            <Typography>{`Min: ${data.min}`}</Typography>
          </Box>
          <Box className={classes.answerBox} borderRadius={10}>
            <Typography>{`Average: ${data.average}`}</Typography>
          </Box>
        </React.Fragment>
      );
    }
    else if (props.qInfo.type==="scale") {
      return (
        <Chart data={data} className={classes.chart} height="200" >
          <ValueScale modifyDomain={domain=>[domain[0], domain[1]*4]} />
          <ArgumentAxis />
          <ValueAxis showGrid={false} showLine showTicks />
          <BarSeries  
            name="scale"
            valueField="count"
            argumentField="content"
          />
          <Legend />
          <EventTracker />
          <Tooltip />
        </Chart>
      );      
    }
    else if (props.qInfo.type==="text") {
      return (
        <React.Fragment>
          { data.length ? data.map((ans, index) => (
            <Box className={classes.answerBox} borderRadius={10} key={index}>
              <Typography>{ans}</Typography>
            </Box>            
          )):null }
        </React.Fragment>
      );
    }
  }

  return (
    <React.Fragment>
      <Paper className={classes.statisticCard} >
        <Typography> {`Q${props.qInfo.qstnId}: ${props.qInfo.content}`} </Typography>
        {/* <Box bgcolor="text.disabled" color="primary.contrastText" width="20vw" padding={1} >{props.qInfo.formId}  </Box> */}
        {getStatistics()}
      </Paper>
    </React.Fragment>
  );
}