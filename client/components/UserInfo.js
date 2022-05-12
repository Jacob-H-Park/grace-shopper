import { Box, Paper,InputBase,TextField,InputLabel } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { alpha, styled } from '@mui/material/styles';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
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
    const paperStyle = {
      padding: 20,
      height: "300px",
      width: "80%",
      margin: "20px auto",
    };

    return (
      <Box sx={{
        display:"flex",
        flexDirection: 'row',
        width:"60%",
        height: "300px",
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
            flexDirection:'column'
          }}>
            <h4 style={{
              font:'Abril Fatface',
              margin:'0.5rem'
            }}>Personal Information</h4>
            <InputLabel shrink htmlFor="bootstrap-input">
              Bootstrap
            </InputLabel>
            <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
            <label><strong>Username:</strong></label><p style={{style: 'inline'}}>{auth.username}</p>
            <h1>{auth.email}</h1>

          </Box>
        </Paper>
      </Box>
    )    
          {/* <h3><u>Welcome To Your Profile!</u></h3>
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
          </Box> */}
    
    
  }
}

const mapState = ({ auth }) => {
  return { auth };
};

export default connect(mapState)(UserInfo);
