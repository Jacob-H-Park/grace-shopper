import { AddShoppingCart } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../store/order";

const FlowerCard = ({ flower, user, SlideTransition, handleClick }) => {
  const dispatch = useDispatch();

  return (
    <Grid key={flower.id} item xs={3}>
      <Card key={flower.id} sx={{ maxWidth: "400px" }}>
        <CardActionArea>
          <Link to={`/flowers/${flower.id}`}>
            <CardMedia component="img" image={flower.image_url} />
          </Link>
        </CardActionArea>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography sx={{ fontSize: "15px" }} component="div">
                {flower.name}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>${flower.price}</Typography>
            </CardContent>
          </Box>

          <Box>
            <IconButton
              sx={{ marginRight: "1rem" }}
              onClick={() => {
                dispatch(addToCart(user.id, flower));
                handleClick(SlideTransition);
              }}
            >
              <AddShoppingCart
                sx={{ height: "30px", width: "30px" }}
                color="secondary"
              />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default FlowerCard;
