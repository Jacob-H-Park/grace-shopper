import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { fetchProducts } from "../store/flowers";
import { addToCart } from "../store/order";

import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

const Container = styled.div``;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;


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
    <Container>
      <FilterContainer>
        <label htmlFor="flower-category"></label>
        <Select name="name" id="flower-category" onChange={handleChange}>
          <option value="rose">Roses</option>
          <option value="tulip">Tulips</option>
          <option value="orchid">Orchids</option>
          <option value="signature_bouquets">Signature Bouquets</option>
          <option value="sympathy">Sympathy</option>
          <option value="preserved_rose">Preserved Roses</option>
        </Select>
      </FilterContainer>

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
        <div>
          {flowers.map((flower) => {
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
      )}
    </Container>
  );
};

export default Flowers;
