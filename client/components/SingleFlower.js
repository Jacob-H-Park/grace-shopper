import React from "react";
import { useSelector } from "react-redux";

const SingleFlower = (props) => {
  const flower = useSelector(({ product }) => {
    return product.find((flower) => flower.id === props.match.params.id * 1);
  });
  console.log(flower);
  return (
    <div>
      <div>Name: {flower.name}</div>
      <div>Category: {flower.category}</div>
      <div>Price: {flower.price}</div>
      <img src={flower.image_url} />

      <div>Description: {flower.description}</div>
    </div>
  );
};

export default SingleFlower;
