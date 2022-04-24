import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts, removeProducts } from "../store/flowers";

class ProductInfo extends React.Component {
  componentDidMount() {
    this.props.loadProducts();
  }
  render() {
    const { flowers, removeProducts } = this.props;
    return (
      <div>
        {flowers.map((flower) => {
          return (
            <div key={flower.id}>
              <img src={flower.image_url} />
              <ul>Name: {flower.name}</ul>
              <ul>Stock: {flower.stock}</ul>
              <ul>Price: {flower.price}</ul>
              <Link to={`/editflowerinfo/${flower.id}`}>
                <button>Edit</button>
              </Link>
              <button
                onClick={() => {
                  removeProducts(flower.id);
                }}
              >
                Remove Product
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapState = ({ flowers }) => {
  return { flowers };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
    removeProducts: (id) => dispatch(removeProducts(id)),
  };
};
export default connect(mapState, mapDispatch)(ProductInfo);
