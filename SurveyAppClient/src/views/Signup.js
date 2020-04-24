import React, { useState } from "react";
import { Button, Grid, Paper, Typography, Link } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';

import styles from "../styles/SignFormStyle";

const useStyles = makeStyles(styles);

function Signup(props) {

  const classes = useStyles();
  const errObj = {
    unameEmpty: false,
    unameOccupied: false,
    emailEmpty: false,  
    emailError: false,
    emailOccupied: false, 
    pwdError: false,
    pwdRepeatError: false,
  }
  const [error, setError] = useState(errObj);
  const [uname, setUname] = useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const [pwdRepeat, setPwdRepeat] = useState();

  const validateAndUpdateUname = (e) => {
    if (e.target.value==="") {
      let {unameEmpty, ...others} = error; 
      unameEmpty = true;
      setError({unameEmpty, ...others});
    }
    else if (false) { //留给fetch,验证是否被占用
      let {unameOccupied, ...others} = error; 
      unameOccupied = true;
      setError({unameOccupied, ...others});
    }
    else {
      let {unameEmpty, unameOccupied, ...others} = error; 
      unameEmpty = false; unameOccupied = false;
      setError({unameEmpty, unameOccupied, ...others});
    }
    setUname(e.target.value);
  }

  const unameHelperText = () => {
    if (error.unameEmpty) return "please input an username";
    else if (error.enameOccupied) return "username occupied";
  }

  const validateAndUpdateEmail = (e) => {
    if (e.target.value==="") {  //empty
      let {emailEmpty, ...others} = error;
      emailEmpty = true;
      setError({emailEmpty, ...others});
    } 
    else {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let {emailEmpty, emailError, emailOccupied, ...others} = error;
      if (!regex.test(e.target.value)) {  //invalid input
        emailError = true;  emailEmpty = false;
        setError({emailEmpty, emailError, ...others});
      } 
      else if (false) {
        let {emailOccupied, ...others} = error; 
        emailOccupied = true;
        setError({emailOccupied, ...others});
      }
      else {  //no error
        emailError = false; emailEmpty = false; emailOccupied = false;
        setError({emailEmpty, emailError, ...others});
      }
    }
    setEmail(e.target.value); //update email
  }

  const emailHelperText = () => {
    if (error.emailEmpty) {
      return "Please enter an email address"
    } 
    else if (error.emailError) {
      return "Please input correct email address"
    }
    else if (error.emailOccupied){
      return "Email occupied";
    }
  }

  const validateAndUpdatePwd = (e) => {
    if (e.target.value.length < 6) {
      let {pwdError, ...others} = error;
      pwdError = true;
      setError({pwdError, ...others});
    } else {
      //No error
      let {pwdEmpty, pwdError, ...others} = error;
      pwdError = false;
      pwdEmpty = false;
      setError({pwdEmpty, pwdError, ...others});     
    }
    setPwd(e.target.value); //Update Password
  }

  const pwdHelperText = () => {
    if (error.pwdError) return "Your password should be longer than 6 characters"
  }

  const validateAndUpdatePwdRepeat = (e) => {
    if (e.target.value !== pwd) {
      let {pwdRepeatError, ...others} = error;
      pwdRepeatError = true;
      setError({pwdRepeatError, ...others});
    }
    else {
      let {pwdRepeatError, ...others} = error;
      pwdRepeatError = false;
      setError({pwdRepeatError, ...others});
    }
    setPwdRepeat(e.target.value);
  }

  const pwdRepeatHelperText = () => {
    if (error.pwdRepeatError) return "Different from the password above"
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(e);
    console.log(uname);
    console.log(email);
    console.log(pwd);
    console.log(pwdRepeat);

    props.history.push("/login");

  }

  return (
    <Grid container justify="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item sm={10} md={6} lg={3}>
        <Paper className={classes.paper}>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
            className={classes.formHeader}
          >
            <Grid item>
              <EmojiPeopleRoundedIcon color="primary" style={{ fontSize: 48 }}/>
            </Grid>
            <Grid item>
              <Typography variant="h4">Sign up</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {"Already have an account? "}
                <Link href="/login" underline="always">
                  Sign in here
                </Link>
              </Typography>
            </Grid>
          </Grid>

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="signup-uname"
              label="Username"
              helperText={unameHelperText()}
              variant="outlined"
              margin="normal"
              size="medium"
              fullWidth
              required
              onBlur={validateAndUpdateUname}
              error={error.unameEmpty||error.unameOccupied}
            />
            <TextField
              id="signup-email"
              label="Email"
              helperText={emailHelperText()}
              variant="outlined"
              margin="normal"
              size="medium"
              fullWidth
              required
              onBlur={validateAndUpdateEmail}
              error={error.emailEmpty||error.emailError}
            />
            <TextField
              id="signup-pwd"
              type="password"
              label="Password"
              helperText={pwdHelperText()}
              variant="outlined"
              margin="normal"
              size="medium"
              fullWidth
              onBlur={validateAndUpdatePwd}
              error={error.pwdError}
            />
            <TextField
              id="signup-pwd-rpt"
              type="password"
              label="Repeat Password"
              helperText={pwdRepeatHelperText()}
              variant="outlined"
              margin="normal"
              size="medium"
              fullWidth
              required
              onBlur={validateAndUpdatePwdRepeat}
              error={error.pwdRepeatError}
            />
            <Button 
              variant="contained" 
              color="primary" 
              size="medium" 
              fullWidth
              type="submit" 
              className={classes.button}>
              Sign Up
            </Button>
          </form>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default Signup;
