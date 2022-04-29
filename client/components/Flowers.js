import { AddShoppingCart } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Snackbar,
  Slide,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../store/order";

const Flowers = () => {
  //Redux hooks
  const flowers = useSelector((state) => state.flowers);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //React Hooks
  const [name, setName] = useState("");

  //Snackbar state hook
  const [state, setState] = useState({
    open: false,
    Transition: Slide,
  });

  const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
  };

  //Helper fucntions
  function handleChange(ev) {
    setName(ev.target.value);
  }

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

  return (
    <div>
      <div>
        <label htmlFor="flower-category"></label>
        <select name="name" id="flower-category" onChange={handleChange}>
          <option value="rose">Roses</option>
          <option value="tulip">Tulips</option>
          <option value="orchid">Orchids</option>
          <option value="signature_bouquets">Signature Bouquets</option>
          <option value="sympathy">Sympathy</option>
          <option value="preserved_rose">Preserved Roses</option>
        </select>
      </div>

      {/* When a category is selected, page renders flowers by the given type */}
      <Box>
        {name ? (
          <Grid container spacing={3}>
            {flowers
              .filter((flower) => flower.category === name)
              .map((flower) => {
                return (
                  <Grid item xs={3}>
                    <Card key={flower.id} sx={{ maxWidth: "400px" }}>
                      <Link to={`/flower/${flower.id}`}>
                        <CardMedia component="img" image={flower.image_url} />
                      </Link>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography
                              sx={{ fontSize: "15px" }}
                              component="div"
                            >
                              {flower.name}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              ${flower.price}
                            </Typography>
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
              })}
          </Grid>
        ) : (
          <Grid container spacing={3} sx={{ padding: "2rem" }}>
            {flowers.map((flower) => {
              return (
                <Grid key={flower.id} item xs={3}>
                  <Card key={flower.id} sx={{ maxWidth: "400px" }}>
                    <Link to={`/flower/${flower.id}`}>
                      <CardMedia component="img" image={flower.image_url} />
                    </Link>
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
                          <Typography sx={{ fontSize: "12px" }}>
                            ${flower.price}
                          </Typography>
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
            })}
          </Grid>
        )}
      </Box>
      <Snackbar
        onClose={handleClose}
        autoHideDuration={2500}
        message="Added to Cart"
        open={state.open}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
      />
    </div>
  );
};

export default Flowers;
