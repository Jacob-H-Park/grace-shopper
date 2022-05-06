import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Grid,
  IconButton,
  Snackbar,
  Slide,
  Pagination,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlowerCard from "./FlowerCard";
import ProductPagination from "./HelperComponents/ProductPagination";

const Flowers = () => {
  //Redux hooks
  const flowers = useSelector((state) => state.flowers);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //React Hooks
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setPostsPerPage] = useState(12);

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

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  //Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = flowers.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (evt, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {/* When a category is selected, page renders flowers by the given type */}
      <Box>
        <Box
          sx={{ width: "100%", height: "10%", backgroundColor: "#D9B9C7" }}
          display="flex"
          flexDirection="column-reverse"
        >
          <img src="/Images/headershipping.svg" style={{ width: "100%" }} />
        </Box>
        <Grid container spacing={3} sx={{ padding: "2rem" }}>
          {currentProducts.map((flower) => {
            return (
              <FlowerCard
                flower={flower}
                user={user}
                SlideTransition={SlideTransition}
                handleClick={handleClick}
              />
            );
          })}
        </Grid>
        <Box display="flex" justifyContent="center">
          <ProductPagination
            productsPerPage={productsPerPage}
            totalProducts={flowers.length}
            paginate={paginate}
          />
        </Box>
      </Box>
      <Snackbar
        onClose={handleClose}
        autoHideDuration={2500}
        message="Added to Cart"
        open={state.open}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
        action={action}
      />
    </div>
  );
};

export default Flowers;
