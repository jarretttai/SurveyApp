import React from "react";
import { Button, Grid, Paper, Typography, Link } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState } from "react";

import styles from "../styles/SignFormStyle";

const useStyles = makeStyles(styles);

function Login(props) {
  const classes = useStyles();
  const [error, setError] = useState({emailEmpty: false, pwdEmpty: false, emailError: false, pwdError: false});
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();

  const validateAndUpdateEmail = (e) => {
    if (e.target.value==="") {  //empty
      let {emailEmpty, ...others} = error;
      emailEmpty = true;
      setError({emailEmpty, ...others});
    } 
    else {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let {emailEmpty, emailError, ...others} = error;
      if (!regex.test(e.target.value)) {  //invalid input
        emailError = true;  emailEmpty = false;
        setError({emailEmpty, emailError, ...others});
      } 
      else {  //no error
        emailError = false; emailEmpty = false;
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
    else {
      return "";
    }
  }

  const validateAndUpdatePwd = (e) => {
    if (e.target.value==="") {
      let {pwdEmpty, ...others} = error;
      pwdEmpty = true;
      setError({pwdEmpty, ...others});
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
    if (error.pwdEmpty) {
      return "Password enter your password"
    }
    else if (error.pwdError) {
      return "Wrong password or email address"
    }
    else {
      return "";
    }
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(e);
    console.log(email);
    console.log(pwd);

    props.history.push("/");

  }

  return (
    <Grid container justify="center" alignItems="center" style={{ minHeight: "90vh" }}>
      <Grid item sm={10} md={6} lg={3}>
        <Paper className={classes.paper} elevation={3}>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
            className={classes.formHeader}
          >
            <Grid item>
              <AccountCircleIcon color="primary" style={{ fontSize: 48 }}/>
            </Grid>
            <Grid item>
              <Typography variant="h4">Sign in</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {"No account yet? "}
                <Link href="/signup" underline="always">
                  Sign up here
                </Link>
              </Typography>
            </Grid>
          </Grid>

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="signin-email"
              type="text"
              label="Email"
              variant="outlined"
              margin="normal"
              size="medium"
              fullWidth
              onBlur={validateAndUpdateEmail}
              error={error.emailEmpty||error.emailError}
              helperText={ emailHelperText() }
            />
            <TextField
              id="signin-pwd"
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              size="medium"
              fullWidth
              onBlur={validateAndUpdatePwd}
              error={error.pwdEmpty||error.pwdError}
              helperText={ pwdHelperText() }
            />
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              className={classes.button}
              type="submit"
               >
              Sign In
            </Button>
          </form>

          <Typography variant="body2" align="center">
            <Link href="/" underline="always">
              Forgot password?
            </Link>
          </Typography>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
