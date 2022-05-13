import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Slide,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Icon from '@mui/material/Icon';
import FlowerDetailTabs from "./FlowerDetailTabs";

import CustomizedRating from "./Rating";
import { addToCart } from "../store/order";
import { updateAuthFavoriteList } from "../store/auth";

const SingleFlower = (props) => {
  const flower = useSelector(({ flowers }) => {
    return flowers.find((flower) => flower.id === props.match.params.id * 1);
  });
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [chosenImg, setChosenImg] = useState("");
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

  // hook for creating favorite list
  let Favorited = false;
  if (user.id && flower) {
    Favorited = (user.favoriteList.indexOf(flower.id) === -1 ? false : true);
  }

  const onClickFavorite = (flower) => {
    // user has to login in order to add to favorite
    if (!user.id) {
      alert("Please Log in first to continue...");
      return;
    }

    if (Favorited) {
      const favoriteList = user.favoriteList;
      const index = favoriteList.indexOf(flower.id);
      if (index !== -1) favoriteList.splice(index, 1);
      user.favoriteList = favoriteList;
      dispatch(updateAuthFavoriteList(user.favoriteList));
      Favorited = !Favorited;
    } else {
      user.favoriteList.push(flower.id);
      dispatch(updateAuthFavoriteList(user.favoriteList));
      Favorited = !Favorited;
    }
  };

  //buys time for useSelector to grab the clicked flower info when page's refreshed
  if (!flower) {
    return null;
  }

  return (
    <>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: 3, justifyContent: "center", alignItems: "flex-start" }}
      >
        <Grid
          item
          xs={4}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {flower.image_url2 ? (
            <Grid container justifyContent="center" alignItems="center">
              <Box
                component="img"
                sx={{
                  maxHeight: 1,
                  maxWidth: 1,
                  borderRadius: "12px",
                  boxShadow: 1,
                  overflow: "hidden",
                  fontWeight: "bold",
                }}
                alt="flower"
                src={chosenImg ? chosenImg : flower.image_url2}
              />
              <Box
                component="img"
                sx={{
                  mt: 3,
                  mx: 2,
                  maxHeight: 0.2,
                  maxWidth: 0.2,
                  borderRadius: "12px",
                  boxShadow: 1,
                  overflow: "hidden",
                  fontWeight: "bold",
                  border:
                    chosenImg == flower.image_url2 ? "2px gray solid" : "",
                }}
                alt="flower"
                src={flower.image_url2}
                onClick={() => setChosenImg(flower.image_url2)}
              />
              <Box
                component="img"
                sx={{
                  mt: 3,
                  maxHeight: 0.2,
                  maxWidth: 0.2,
                  borderRadius: "12px",
                  boxShadow: 1,
                  overflow: "hidden",
                  fontWeight: "bold",
                  border:
                    chosenImg == flower.image_url3 ? "2px gray solid" : "",
                }}
                alt="flower"
                src={flower.image_url3}
                onClick={() => setChosenImg(flower.image_url3)}
              />
              <Box
                component="img"
                sx={{
                  mt: 3,
                  mx: 2,
                  maxHeight: 0.2,
                  maxWidth: 0.2,
                  borderRadius: "12px",
                  boxShadow: 1,
                  overflow: "hidden",
                  fontWeight: "bold",
                  border:
                    chosenImg == flower.image_url4 ? "2px gray solid" : "",
                }}
                alt="flower"
                src={flower.image_url4}
                onClick={() => setChosenImg(flower.image_url4)}
              />
            </Grid>
          ) : (
            <Box
              component="img"
              sx={{
                maxHeight: 1,
                maxWidth: 1,
                borderRadius: "12px",
                boxShadow: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                overflow: "hidden",
                boxShadow: 2,
                fontWeight: "bold",
              }}
              alt="flower"
              src={flower.image_url}
            />
          )}
        </Grid>

        <Grid item xs={4}>
          <Box display="flex" alignItems="center" sx={{ fontSize: "h4.fontSize" }}>
            {/* {flower.name} &emsp; <Icon><img src={"/Images/add-to-favorites-button.png"} height={25} width={25}/></Icon> */}
            {flower.name} &emsp;
            {/* <Button variant="contained" color="secondary" size="small"> */}
            <IconButton color="secondary" aria-label="favorite" component="span">
              {!Favorited ? <FavoriteBorderIcon sx={{height: 25, width: 25}} onClick={() => onClickFavorite(flower)} />
                : <FavoriteIcon sx={{height: 28, width: 28, color: "#ff6d75"}} onClick={()=> onClickFavorite(flower)} />
              }
            </IconButton>
            {/* </Button> */}
          </Box>
          <CustomizedRating />
          <Box sx={{ fontSize: 16, mt: 1 }}>${flower.price}</Box>
          <Box
            sx={{
              mt: 3,
              color: "text.secondary",
              fontWeight: "regular",
              fontStyle: "italic",
              fontSize: 15,
              alignItems: "center",
            }}
          >
            {flower.description}
          </Box>
          <Divider sx={{ mt: 3 }}></Divider>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                mt: 3,
                height: 40,
                width: 1,
                bgcolor: "black",
              }}
              onClick={() => {
                dispatch(addToCart(user.id, flower));
                handleClick(SlideTransition);
              }}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add To Cart
            </Button>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: "13px",
                mt: 2,
              }}
            >
              Free US Shipping $125+
            </Typography>
            <Divider sx={{ mt: 3 }}></Divider>
          </Grid>
          <Divider sx={{ mt: 3 }}></Divider>
          <FlowerDetailTabs />
        </Grid>
        <Snackbar
          onClose={handleClose}
          autoHideDuration={2500}
          message="Added to Cart"
          open={state.open}
          TransitionComponent={state.Transition}
          key={state.Transition.name}
          // action={action}
        />
      </Grid>
    </>
  );
};

export default SingleFlower;
