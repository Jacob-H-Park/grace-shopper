import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Grid } from "@mui/material";

export default function specialProduct(props) {
  const flower = useSelector(({ flowers }) => {
    return flowers.find((flower) => flower.id === props.match.params.id * 1);
  });
  const [chosenImg, setChosenImg] = useState("");

  return (
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
          border: chosenImg == flower.image_url2 ? "2px coral solid" : "",
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
          border: chosenImg == flower.image_url3 ? "2px coral solid" : "",
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
          border: chosenImg == flower.image_url4 ? "2px coral solid" : "",
        }}
        alt="flower"
        src={flower.image_url4}
        onClick={() => setChosenImg(flower.image_url4)}
      />
    </Grid>
  );
}
