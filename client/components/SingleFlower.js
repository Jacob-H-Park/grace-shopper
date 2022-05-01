import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FlowerDetailTabs from "./FlowerDetailTabs";

import CustomizedRating from "./Rating";
import { addToCart } from "../store/order";

const SingleFlower = (props) => {
  const flower = useSelector(({ flowers }) => {
    return flowers.find((flower) => flower.id === props.match.params.id * 1);
  });
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
        <Grid item xs={4}>
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
        </Grid>

        <Grid item xs={4}>
          <Box sx={{ fontSize: "h4.fontSize" }}>{flower.name}</Box>
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
                mt: 3,
              }}
            >
              Free US Shipping $125+
            </Typography>
            <Divider sx={{ mt: 3 }}></Divider>
          </Grid>
          <Divider sx={{ mt: 3 }}></Divider>
          <FlowerDetailTabs />
        </Grid>
      </Grid>
    </>
  );
};

export default SingleFlower;
