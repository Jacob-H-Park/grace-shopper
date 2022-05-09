import { Box, Paper } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserInfo extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { auth } = this.props;
    const paperStyle = {
      padding: 20,
      height: "500px",
      width: "30%",
      margin: "20px auto",
    };

    return (
      <Box>
        <Paper elevation={1} style={paperStyle}>
          <h3><u>Welcome To Your Profile!</u></h3>
            <label><strong>Username:</strong></label><p style={{style: 'inline'}}>{auth.username}</p>
          <h1>{auth.email}</h1>
          <Box display='flex' flexDirection='column-reverse'>
            <Box>
              <Link to="/account/edit">
                <button>Basic Information</button>
              </Link>
              <Link to="/account/password">
                <button>Login/Authentication</button>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
}

const mapState = ({ auth }) => {
  return { auth };
};

export default connect(mapState)(UserInfo);
