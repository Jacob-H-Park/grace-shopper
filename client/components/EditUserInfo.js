import React, { Component } from "react";
import { connect } from "react-redux";
import { updateAuth } from "../store";
import { Box, Button, Paper } from "@mui/material";
class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.auth.id ? this.props.auth.id : "",
      username: this.props.auth.username ? this.props.auth.username : "",
      email: this.props.auth.email ? this.props.auth.email : "",
      password: this.props.auth.password ? this.props.auth.password : "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.auth && this.props.auth) {
      console.log("update!");
      this.setState({
        id: this.props.auth.id,
        username: this.props.auth.name,
        email: this.props.auth.email,
      });
    }
  }
  handleSubmit(ev) {
    ev.preventDefault();
    console.log("submit!", ev);
    this.props.updateUser(
      this.state.username,
      this.state.email,
      this.state.password
    );
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { username, email } = this.state;
    const { handleSubmit, handleChange } = this;
    const paperStyle = {
      padding: 20,
      height: "auto",
      width: 380,
      margin: "20px auto",
    };

    return (
      <div>
        <Paper elevation={1} style={paperStyle}>
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Box>
              <h1>Update Profile:</h1>
            </Box>
            <Box display="flex" flexDirection="column">
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">User Name:</label>
                <input
                  name="username"
                  onChange={handleChange}
                  value={username}
                  style={{ marginBottom: "1rem" }}
                />

                <label htmlFor="email">Email:</label>
                <input
                  name="email"
                  onChange={handleChange}
                  value={email}
                  style={{ marginBottom: "1rem" }}
                />
                <br />
                
                <Button variant="contained" color="secondary" type="submit">Update</Button>
              </form>
            </Box>
          </Box>
        </Paper>
      </div>
    );
  }
}

const mapState = ({ auth }) => {
  return { auth };
};
const mapDispatch = (dispatch, { history }) => {
  return {
    updateUser: (username, email, password) => {
      dispatch(updateAuth(username, email, password, history));
    },
  };
};
export default connect(mapState, mapDispatch)(EditUserInfo);
