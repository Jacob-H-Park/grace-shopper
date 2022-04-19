import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";

class Products extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        {product.map((product) => {
          return (
            <div key={product.id}>
              {product.name}
              <div>
                <Link to={`/flower/${product.id}`}>
                  <img src={product.image_url} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(Products);
