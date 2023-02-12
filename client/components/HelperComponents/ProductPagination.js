import { Pagination } from "@mui/material";
import React from "react";

const ProductPagination = ({productsPerPage, totalProducts, paginate}) => {
  const pageNumbers = []; 

  for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i ++) {
    pageNumbers.push(i);
  }

  return(
    <div>
       <Pagination count={pageNumbers.length} onChange={paginate} color='secondary' shape="rounded" />
    </div>
  )
}

export default ProductPagination;