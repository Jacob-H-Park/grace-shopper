import React from "react";
import { connect } from "react-redux";
import { comparePass } from "../store";
import { updatePass } from "../store";
import { Box, Paper, Button ,InputLabel,Divider, Stack, FormControl,FilledInput,InputAdornment,IconButton   } from "@mui/material";
import {Visibility,VisibilityOff} from '@mui/icons-material';


class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      oldPassword: "",
      isChanging: false,
      confirmPassword: "",
      error: "",
      showPassword:false
    };
    this.handleSubmit = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
  }
  validateForm() {
    return (
      this.state.oldPassword.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleClickShowPassword =()=>{
    const {showPassword} = this.state
    this.setState({
      showPassword:!showPassword
    })
    console.log(showPassword)
  }

  handleMouseDownPassword =(event)=>{
    event.preventDefault()
  }

  handleClick = async (event) => {
    const { oldPassword } = this.state;
    event.preventDefault();
    this.setState({ isChanging: true });
    try {
      if (await this.props.comparePassword(oldPassword)) {
        this.props.updatePassword(this.state.password);
      }
    } catch (err) {
      alert(err.message);
      this.setState({ isChanging: false });
    }
  };

  render() {
    const { oldPassword, password, confirmPassword,showPassword } = this.state;
    const { handleClick, handleChange,handleClickShowPassword,handleMouseDownPassword } = this;
    return (
      <Box sx={{
        display:"flex",
        flexDirection: 'row',
        width:"60%",
        height: "350px",
        justifyContent:'space-around',
        margin: "20px auto",
      }}>
        <Paper elevation = {12} 
                variant ="outlined"
                sx={{
                  width: "100%",
                  border:1,
                  borderColor: "white"
                }}
        >
          <Box sx={{
            display:'flex',
            flexWrap:'wrap',
            flexDirection:'column',
          }}>
            <h4 style={{
              font:'Abril Fatface',
              margin:'0.5rem'
            }}>Change Password</h4>
            <Divider />
            <form onSubmit={handleClick}>
              <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems:'center',
                margin: '0.5rem',
              }}>
                <FormControl sx={{ m: 2, width: '25ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Old Password</InputLabel>
                  <FilledInput
                    sx={{
                      height:'40px'
                    }}
                    id="filled-adornment-password"
                    name='oldPassword'
                    type={showPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ m: 2, width: '25ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">New Password</InputLabel>
                  <FilledInput
                    sx={{
                      height:'40px'
                    }}
                    id="filled-adornment-password"
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ m: 2, width: '25ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                  <FilledInput
                    sx={{
                      height:'40px'
                    }}
                    id="filled-adornment-password"
                    name='confirmPassword'
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                
                <Button variant = 'outlined' color ='primary' type="submit" disabled={!this.validateForm()}>
                  Update 
                </Button>
                
              </Stack>
            </form>
          </Box>
        </Paper>
      </Box>

    );
  }
}

const mapState = ({ auth }) => {
  return { auth };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    updatePassword: (password) => {
      dispatch(updatePass(password, history));
    },
    comparePassword: (oldPassword) => {
      return dispatch(comparePass(oldPassword));
    },
  };
};
export default connect(mapState, mapDispatch)(ChangePassword);
