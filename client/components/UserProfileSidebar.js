import { Box, 
         MenuList,
         MenuItem, 
         ListItemIcon,
         ListItemText,
         Divider
        } 
from '@mui/material'

import React from 'react'
import { Link } from 'react-router-dom';

const UserProfileSideBar = ()=>{
    return(
        <Box sx={{
            backgroundColor:"red",
            marginLeft:'25px',
            marginTop:'25px',
            width: "150px",
           
            backgroundColor: "secondary"
            }}
        >   <Link to="/account">
                <h3 style ={{
                    margin:'10px'
                }}>My Account</h3>
            </Link>
            
            <Divider />
            <MenuList>
                <MenuItem sx={{
                    padding: '10px'
                }}>
                    <Link to="/account/edit">
                        <ListItemText>
                            Profile
                        </ListItemText>   
                    </Link> 
                </MenuItem>
                <MenuItem sx={{
                    padding: '10px'
                }}>
                    <Link to="/account/password">
                        <ListItemText>
                            Authentication
                        </ListItemText>
                    </Link>
                </MenuItem>
                
            </MenuList>
        </Box>
    )
}

export default UserProfileSideBar