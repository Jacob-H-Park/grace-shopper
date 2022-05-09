import React from "react";
import { Box } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      container
      position="relative"
      textAlign="center"
      sx={{ width: 1, height: "auto" }}
      bgcolor="white"
    >
      <Box>
        <Box
          component="img"
          sx={{
            width: "40vw",
            height: "auto",
          }}
          alt="landing page img"
          src={"/Images/landing-image.jpg"}
        />
      </Box>
      <Box
        color="text.disabled"
        position="absolute"
        fontSize="80px"
        text-shadow="#FC0 1px 0 100px"
        top="10%"
        left="30%"
        sx={{ textShadow: "blue 1px 1px 80px" }}
      >
        Welcome to Bloom
      </Box>
    </Box>
  );
};

export default LandingPage;
