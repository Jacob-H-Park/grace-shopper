import { Box, Button, Paper } from "@mui/material";
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
        <Paper
          elevation={1}
          style={paperStyle}
          sx={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <Box sx={{ marginRight: "auto", marginLeft: "auto" }}>
            <Box sx={{marginBottom: '2rem'}}>
              <h3>
                <u>Welcome To Your Profile!</u>
              </h3>
            </Box>
            <Box sx={{marginBottom: '2rem'}}>
              <label style={{marginBottom: '1rem'}}>
                <strong>Username:</strong> {auth.username}
              </label>
              <label>
                <strong>Email:</strong> {auth.email}
              </label>
            </Box>
            <Box display="flex" flexDirection="column-reverse">
              <Box>
                <Link to="/account/edit">
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{ marginRight: ".5rem" }}
                  >
                    Basic Information
                  </Button>
                </Link>
                <Link to="/account/password">
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{ marginLeft: ".5rem" }}
                  >
                    Login/Authentication
                  </Button>
                </Link>
              </Box>
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
