import React, { Component } from "react";

import { Box, Container, Grid, Link, Avatar } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 2, sm: 10 }}
        py={{ xs: 4, sm: 10 }}
        bgcolor="#d9aaba"
        color="white"
        mt={5}
        fontFamily="BlinkMacSystemFont"
      >
        <Container maxWidth="lg">
          <Grid container display="flex" justifyContent="center" spacing={12}>
            <Grid item xs={12} sm={4}>
              <Box fontSize={20} fontStyle="oblique">
                Customer Service
              </Box>
              <Box mt={2}>Help / FAQ</Box>
              <Box mt={2}>Returns & Exchanges</Box>
              <Box mt={2}>Gift Cards</Box>
              <Box mt={2}>Contact Us</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box fontSize={20} fontStyle="oblique">
                About
              </Box>
              <Box mt={2}>Our Story</Box>
              <Box mt={2}>Shop</Box>
              <Box mt={2}>Reviews</Box>
              <Box mt={2}>Journal</Box>
            </Grid>
            <Grid textAlign="right" item xs={12} sm={4}>
              <Box fontSize={20} fontStyle="oblique">
                Bloom &reg; {new Date().getFullYear()}
              </Box>
              <Box fontSize={12} mt={1}>
                All images and content may not be used without permission
              </Box>
              <Box mt={2}>
                <InstagramIcon sx={{ mx: 0.5 }} fontSize="large" />
                <FacebookIcon sx={{ mx: 0.5 }} fontSize="large" />
                <TwitterIcon sx={{ mx: 0.5 }} fontSize="large" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
