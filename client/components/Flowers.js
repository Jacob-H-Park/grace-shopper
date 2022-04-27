import { AddShoppingCart } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { display } from "@mui/material/node_modules/@mui/system";
import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../store/flowers";
import { addToCart } from "../store/order";

const Flowers = () => {
  //Redux hooks
  const flowers = useSelector((state) => state.flowers);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //React Hooks
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //Helper fucntions
  function handleChange(ev) {
    setName(ev.target.value);
  }

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
      {name ? (
        <div>
          {flowers
            .filter((flower) => flower.category === name)
            .map((flower) => {
              return (
                <div key={flower.id}>
                  {flower.name}
                  <div>
                    <Link to={`/flower/${flower.id}`}>
                      <img src={flower.image_url} />
                    </Link>
                  </div>
                  <button onClick={() => dispatch(addToCart(user.id, flower))}>
                    Add to cart
                  </button>
                </div>
              );
            })}
        </div>
      ) : (
        <Box>
          {flowers.map((flower) => {
            return (
              <Card sx={{ maxWidth: "400px" }}>
                <CardMedia component="img" image={flower.image_url} />
                <Box sx={{display: 'flex', alignItems: 'center'}}>
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
                  <Box flexGrow={1}>
                    <IconButton>
                      <AddShoppingCart
                        sx={{ height: "30px", width: "30px" }}
                        color="secondary"
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>

        // <div>
        //   {flowers.map((flower) => {
        //     return (
        //       <div key={flower.id}>
        //         {flower.name}
        //         <div>
        //           <Link to={`/flower/${flower.id}`}>
        //             <img src={flower.image_url} />
        //           </Link>
        //         </div>
        //         <button onClick={() => dispatch(addToCart(user.id, flower))}>
        //           Add to cart
        //         </button>
        //       </div>
        //     );
        //   })}
        // </div>
      )}
    </div>
  );
};

export default Flowers;
