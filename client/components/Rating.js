import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import GradeIcon from "@mui/icons-material/Grade";
import Typography from "@mui/material/Typography";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
    // color: "dodgerBlue",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function CustomizedRating() {
  return (
    <Box
      sx={{
        mt: 0.5,
      }}
    >
      {/* <Typography color="text.primary" component="legend">
        Customer Rating
      </Typography> */}
      <StyledRating
        name="customized-color"
        defaultValue={4.5}
        // getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        readOnly
        icon={<GradeIcon fontSize="inherit" />}
        emptyIcon={<GradeIcon fontSize="inherit" />}
      />
    </Box>
  );
}
