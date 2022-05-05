import React, { useState } from "react";
import { connect } from "react-redux";
// import { Link, Redirect } from "react-router-dom";

import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import LockIcon from '@mui/icons-material/Lock';
// import { makeStyles } from '@mui/styles';

import { authenticate } from "../store";
import { Block } from "@mui/icons-material";

const clientId =
  '1058128297512-29b55ub5cermd4npgdqef22vaa4qpgua.apps.googleusercontent.com';

// MUI hook for generate and apply styles from classic .css way
// const useStyles = makeStyles({
//   textfield: {
//     display: "inline-Block",
//   },
// });

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  // const classes = useStyles();

  const [isRemember, setIsRemember] = useState(
    localStorage.getItem("isRemember") === "true" ? true : false
  );

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };

  const paperStyle={ padding: 20, height:'70vh', width: 380, margin:"20px auto" };
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
                {/* <Avatar style={avatarStyle}><LockIcon/></Avatar> */}
            <Typography variant="h4">{displayName}</Typography>
          </Grid>
          {/* <TextField label='Username' placeholder='Enter username' variant="standard" fullWidth required/> */}
          <FormControl variant="standard" className="textfield" sx={{margin: "8px"}} fullWidth required>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input name="username"/>
          </FormControl>
          {/* <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/> */}
          <FormControl variant="standard" className="textfield" sx={{margin: "8px"}} fullWidth required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password"/>
          </FormControl>
          <FormControlLabel
            label="Remember Me"
            control={
              <Checkbox
                checked={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
            }
            sx={{marginTop: "8px", marginBottom: "8px", marginLeft: "-3px"}}
          />
          {/* <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button> */}
          <Button variant="contained" color="secondary" sx={{ margin: "0", backgroundColor: "#da0037" }} type="submit" fullWidth>
            {displayName}
          </Button>
          <Grid align='center'>
          <h5>OR</h5>
          <hr />
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            render={renderProps => (
              <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} style={{marginTop: "8px", marginBottom: "10px", display: "inline-block", justifyContent: "center", width: "100%"}}>
                Log in with Google
              </GoogleButton>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
          <Typography color="textSecondary" sx={{marginTop: "15px", fontSize: 14, marginBottom: "10px"}}>
            By continuing, you agree to BLOOM's <strong>Terms of Service, Privacy Policy</strong>
          </Typography>
          <hr style={{width: "50%"}}></hr>
          <Typography color="textSecondary" sx={{marginTop: "10px"}}>
            <strong>Not on BLOOM. yet?</strong>
            <br />
            <a href="/signup"><span style={{color: "blue", textDecoration: "underline"}}> Sign up </span></a>
          </Typography>
          </Grid>
          {/* <Typography >
                <Link href="#" >
                  Forgot password ?
          </Link>
          </Typography>
          <Typography > Do you have an account ?
                <Link href="#" >
                  Sign Up 
          </Link>
          </Typography> */}
      </Paper>
    </Grid>
    // <div className="card" style={{ paddingTop: "1%", margin: "auto", textAlign: "center", width: 380 }}>
    //   <Card className="card-body">
    //     <CardContent>
    //       <Typography variant="h4">{displayName}</Typography>
    //       <br />
    //       <form onSubmit={handleSubmit} name={name}>
    //         {name === "signup" &&
    //           <div>
    //             <label htmlFor="email">
    //               <small>Email</small>
    //             </label>
    //             <input name="email" type="text" />
    //           </div>
    //         }
    //         {/* <TextField
    //           label="username"
    //           id="margin-normal"
    //           name="username"
    //           helperText="Enter your full name"
    //         /> */}
    //         <Box
    //         component="form"
    //         sx={{
    //           '& > :not(style)': { m: 1 },
    //           display: 'flex',
    //           alignItems: 'center',
    //           flexDirection: 'column',
    //         }}
    //         noValidate
    //         autoComplete="off"
    //         >
    //         <FormControl variant="standard" className="textfield">
    //           <InputLabel htmlFor="username">Username</InputLabel>
    //           <Input name="username" sx={{margin: "0"}}/>
    //         </FormControl>
    //         {/* <div>
    //           <label htmlFor="username">
    //             <small>Username</small>
    //           </label>
    //           <input name="username" type="text" />
    //         </div> */}
    //         <FormControl variant="standard" className="textfield">
    //           <InputLabel htmlFor="password">Password</InputLabel>
    //           <Input name="password" sx={{margin: "0"}}/>
    //         </FormControl>
    //         {/* <div>
    //           <label htmlFor="password">
    //             <small>Password</small>
    //           </label>
    //           <input name="password" type="password" />
    //         </div> */}
    //         <FormControl variant="standard" className="textfield">
    //           <FormControlLabel
    //             label={"Remember Me"}
    //             control={
    //               <Checkbox
    //                 checked={isRemember}
    //                 onChange={() => setIsRemember(!isRemember)}
    //               />
    //             }
    //             // style={{marginLeft: "-61px"}}
    //           />
    //         </FormControl>
    //         </Box>
    //         <CardActions sx={{ justifyContent: "center", margin: "0", padding: "0" }}>
    //           <Button variant="contained" color="secondary" sx={{ margin: "0", backgroundColor: "#da0037" }} type="submit">
    //             {displayName}
    //           </Button>
    //         </CardActions>
    //         {/* <br /> */}
    //         {error && error.response && <div> {error.response.data} </div>}
    //       </form>
    //       <h6>OR</h6>
    //       <hr />
    //       <GoogleLogin
    //         clientId={clientId}
    //         buttonText="Login"
    //         render={renderProps => (
    //           <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} style={{marginTop: "8px", marginBottom: "10px", display: "inline-block", justifyContent: "center"}}>
    //             Log in with Google
    //           </GoogleButton>
    //         )}
    //         onSuccess={onSuccess}
    //         onFailure={onFailure}
    //         cookiePolicy={'single_host_origin'}
    //         isSignedIn={true}
    //       />
    //       <Typography color="textSecondary">
    //         Already have an account?
    //         <br />
    //         <a href="/login"><span style={{color: "blue", textDecoration: "underline"}}> Login </span></a>
    //       </Typography>
    //     </CardContent>
    //   </Card>
    // </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      let email = "";
      if (evt.target.email) email = evt.target.email.value;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      if (email) {
        dispatch(authenticate(username, password, formName, email));
      } else {
        dispatch(authenticate(username, password, formName));
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
