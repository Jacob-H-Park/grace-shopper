import React, { useState } from "react";
import { connect } from "react-redux";

import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import {
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  InputAdornment,
  Checkbox,
  Grid,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

import { authenticate, onSuccessGoogle, onFailureGoogle } from "../store";

const clientId =
  "1058128297512-29b55ub5cermd4npgdqef22vaa4qpgua.apps.googleusercontent.com";

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
  const { name, displayName, handleSubmit, onSuccess, onFailure, error } = props;

  // const classes = useStyles();

  const [isRemember, setIsRemember] = useState(
    localStorage.getItem("isRemember") === "true" ? true : false
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 380,
    margin: "20px auto",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Abril Fatface",
              fontWeight: "600",
              marginTop: "5px",
              marginBottom: "15px",
            }}
          >
            Welcome to Bloom.
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit} name={name}>
          {name === "signup" && (
            <FormControl
              variant="standard"
              className="textfield"
              sx={{ margin: "8px" }}
              fullWidth
              required
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input name="email" />
            </FormControl>
          )}
          <FormControl
            variant="standard"
            className="textfield"
            sx={{ margin: "8px" }}
            fullWidth
            required
          >
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input name="username" />
          </FormControl>
          <FormControl
            variant="standard"
            className="textfield"
            sx={{ margin: "8px" }}
            fullWidth
            required
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {name === "login" && (
            <Typography color="textSecondary" sx={{ margin: "8px" }}>
              <strong>Forgot your password?</strong>
            </Typography>
          )}
          <FormControlLabel
            label="Remember Me"
            control={
              <Checkbox
                checked={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              />
            }
            sx={{ marginTop: "8px", marginBottom: "8px", marginLeft: "-3px" }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              margin: "0",
              backgroundColor: "#98798E",
              fontWeight: "600",
            }}
            type="submit"
            fullWidth
          >
            {displayName}
          </Button>
        </form>
        <Grid align="center">
          <h5>OR</h5>
          <hr />
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{
                  marginTop: "8px",
                  marginBottom: "10px",
                  display: "inline-block",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Log in with Google
              </GoogleButton>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Typography
            color="textSecondary"
            sx={{ marginTop: "15px", fontSize: 14, marginBottom: "10px" }}
          >
            By continuing, you agree to BLOOM's{" "}
            <strong>Terms of Service, Privacy Policy</strong>
          </Typography>
          <hr style={{ width: "50%" }}></hr>
          {name === "login" && (
            <Typography color="textSecondary" sx={{ marginTop: "10px" }}>
              <strong>Not on BLOOM. yet?</strong>
              <br />
              <a href="/signup">
                <span style={{ color: "#98798E", textDecoration: "underline" }}>
                  {" "}
                  Sign up{" "}
                </span>
              </a>
            </Typography>
          )}
        </Grid>
      </Paper>
    </Grid>
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
    onSuccess: (res) => {
      dispatch(onSuccessGoogle(res));
    },
    onFailure: (res) => {
      dispatch(onFailureGoogle(res));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
