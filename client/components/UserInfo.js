import { Box, Paper, InputBase, InputLabel } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { alpha, styled } from "@mui/material/styles";
import { Divider } from "@mui/material";

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

class UserInfo extends React.Component {
  constructor() {
    super();
  }

  render() {
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
              Personal Information
            </h4>
            <Divider />
            <Box sx={{
              display:'flex',
              flexDirection: 'row',
              margin:'auto',
              marginTop: '0.5rem'
            }}>
              <Paper elevation={0} square sx={{
                width:'100px',
                height:'100px',
                marginTop: '3rem',
                marginLeft: '0.5rem'
              }}>
               <img src={auth.avatar} width="100px" height="100px" />
              </Paper>
              <Box sx={{
                display:'flex',
                flexDirection: 'column'
              }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    margin: "0.5rem",
                  }}
                >
                  <Box sx={{
                    margin: '1rem'
                  }}>
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
                      defaultValue={auth.username}
                      id="bootstrap-input"
                    />
                  </Box>
                  <Box sx={{
                    margin: '1rem'
                  }}>
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
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    margin: "0.5rem",
                  }}
                >
                  <Box >
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
                    />
                  </Box>
                </Box>
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
