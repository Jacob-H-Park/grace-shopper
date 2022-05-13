import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Box, Grid, IconButton, Snackbar, Slide, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalFloristSharpIcon from "@mui/icons-material/LocalFloristSharp";
import FlowerCard from "./FlowerCard";

function FavoriteList() {

    const user = useSelector((state) => state.auth);
    const flowers = useSelector((state) => state.flowers);
    const flowerList = [];

    if (user.id && flowers) {
        user.favoriteList.map(flowerId => {
        const flower = flowers.filter(flower => flower.id === flowerId);
        flowerList.push(...flower);
        });
    }

    //Snackbar state hook
    const [state, setState] = useState({
        open: false,
        Transition: Slide,
    });

    const SlideTransition = (props) => {
        return <Slide {...props} direction="up" />;
    };

    //for snackbar
    const handleClick = (Transition) => {
        setState({
        open: true,
        Transition,
        });
    };

    //for snackbar
    const handleClose = () => {
        setState({
        ...state,
        open: false,
        });
    };

    const action = (
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
    );

    if (!user) {
        return null;
    }

    return (
        <div className='container'>
            <Box sx={{
            backgroundColor:"red",
            marginLeft:'25px',
            marginTop:'25px',
            width: "150px",
            backgroundColor: "secondary"
            }}
            >
                <IconButton color="secondary" component="span">
                    <LocalFloristSharpIcon />
                    My Favorite List
                </IconButton>
                {/* <h3 style ={{
                    margin:'10px'
                }}>My Favorite List</h3> */}
                <Divider />
            </Box>
            <Grid container spacing={3} sx={{ padding: "2rem" }}>
                {flowerList.map((flower) => {
                    return (
                    <FlowerCard
                        flower={flower}
                        user={user}
                        SlideTransition={SlideTransition}
                        handleClick={handleClick}
                    />
                    );
                })}
            </Grid>
            <Snackbar
                onClose={handleClose}
                autoHideDuration={2500}
                message="Added to Cart"
                open={state.open}
                TransitionComponent={state.Transition}
                key={state.Transition.name}
                action={action}
            />
        </div>
    )
}

export default FavoriteList;
