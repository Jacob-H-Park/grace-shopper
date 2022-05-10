import React, { useState, useRef, useEffect } from "react";
import { Box, Button } from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const imagesArray = [
  "/Images/landing-image-1.jpg",
  "/Images/landing-image-2.jpg",
  "/Images/landing-image-3.jpg",
];
const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeout = useRef(null);
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    timeout.current = setTimeout(nextSlide, 3000);
    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [currentSlide]);

  return (
    <Box
      container
      position="relative"
      textAlign="center"
      sx={{ width: 1, height: "auto" }}
      bgcolor="white"
    >
      {imagesArray.map((image, index) => {
        return (
          <Box key={index}>
            {index === currentSlide && (
              <Box
                component="img"
                sx={{ width: "100vw", height: "93vh", objectFit: "cover" }}
                alt="landing page img"
                src={image}
              />
            )}
          </Box>
        );
      })}

      <Box
        color="text.disabled"
        position="absolute"
        fontSize="80px"
        text-shadow="#FC0 1px 0 100px"
        top="3%"
        left="29%"
        sx={{ textShadow: "magenta 1px 1px 70px" }}
      >
        Welcome to Bloom
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          bottom: "50px",
          right: "50px",
          color: "secondary.main",
        }}
      >
        <ArrowCircleLeftOutlinedIcon fontSize="large" onClick={prevSlide} />
        <ArrowCircleRightOutlinedIcon fontSize="large" onClick={nextSlide} />
      </Box>
    </Box>
  );
};

export default LandingPage;
