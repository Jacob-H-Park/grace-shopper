import React, { Component } from "react";
import { connect } from "react-redux";
import { updateAuth } from "../store";
import {
  Box,
  Button,
  Paper,
  InputBase,
  Divider,
  InputLabel,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: "0px",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 14,
    width: "100%",
    padding: "2px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.auth.id ? this.props.auth.id : "",
      username: this.props.auth.username ? this.props.auth.username : "",
      email: this.props.auth.email ? this.props.auth.email : "",
      password: this.props.auth.password ? this.props.auth.password : "",
      DOB: this.props.auth.DOB ? this.props.auth.DOB : "",
      address: this.props.auth.address ? this.props.auth.address : "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.auth && this.props.auth) {
      this.setState({
        id: this.props.auth.id,
        username: this.props.auth.name,
        email: this.props.auth.email,
      });
    }
  }
  handleSubmit(ev) {
    ev.preventDefault();
    this.props.updateUser(
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.DOB,
      this.state.address
    );
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { username, email, DOB, address } = this.state;
    const { handleSubmit, handleChange } = this;
    const { auth } = this.props;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "60%",
          height: "350px",
          justifyContent: "space-around",
          margin: "20px auto",
        }}
      >
        <Paper
          elevation={12}
          variant="outlined"
          sx={{
            width: "100%",
            border: 1,
            borderColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <h4
              style={{
                font: "Abril Fatface",
                margin: "0.5rem",
              }}
            >
              Update Personal Information
            </h4>
            <Divider />
            <Paper elevation={0} square sx={{
                width:'70px',
                height:'70px',
                marginLeft: '3rem',
              }}>
              <img src={auth.avatar} width="70px" height="70px" />
            </Paper>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: "0.5rem",
                }}
              >
                <Box>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    sx={{
                      marginTop: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    User Name
                  </InputLabel>
                  <BootstrapInput
                    vdefaultValue={auth.username}
                    id="bootstrap-input"
                    name="username"
                    onChange={handleChange}
                    value={username}
                  />
                </Box>
                <Box>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    sx={{
                      marginTop: "1rem",
                    }}
                  >
                    Email
                  </InputLabel>
                  <BootstrapInput
                    defaultValue={auth.email}
                    id="bootstrap-input"
                    name="email"
                    onChange={handleChange}
                    value={email}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <Box>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    sx={{
                      marginTop: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Date of Birth
                  </InputLabel>
                  <BootstrapInput
                    defaultValue={auth.DOB?auth.DOB.slice(0, 10):null}
                    id="bootstrap-input"
                    name="DOB"
                    onChange={handleChange}
                    value={auth.DOB?auth.DOB.slice(0, 10):null}
                  />
                </Box>
                <Box>
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    sx={{
                      marginTop: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Shipping Address
                  </InputLabel>
                  <BootstrapInput
                    defaultValue={auth.address}
                    id="bootstrap-input"
                    name="address"
                    onChange={handleChange}
                    value={address}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "right",
                  marginRight: "50px",
                }}
              >
                <Button variant="outlined" color="primary" type="submit">
                  Update
                </Button>
              </Box>
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
    updateUser: (username, email, password, DOB, address) => {
      dispatch(updateAuth(username, email, password, DOB, address, history));
    },
  };
};
export default connect(mapState, mapDispatch)(EditUserInfo);
