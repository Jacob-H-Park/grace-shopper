import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.loadProducts();
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }
  render() {
    const { handleChange } = this;
    const { product } = this.props;

    return (
      <div>
        <div>
          <label htmlFor="flower-category"></label>
          <select name="name" id="flower-category" onChange={handleChange}>
            <option value="rose">Roses</option>
            <option value="tulip">Tulips</option>
            <option value="orchid">Orchids</option>
          </select>
        </div>

        {/* When a category is selected, page renders flowers by the given type */}
        {this.state.name ? (
          <div>
            {product
              .filter((flower) => flower.category === this.state.name)
              .map((flower) => {
                return (
                  <div key={flower.id}>
                    {flower.name}
                    <div>
                      <Link to={`/flower/${flower.id}`}>
                        <img src={flower.image_url} />
                      </Link>
                    </div>
                  </div>
                );
              })}{" "}
          </div>
        ) : (
          <div>
            {product.map((flower) => {
              return (
                <div key={flower.id}>
                  {flower.name}
                  <div>
                    <Link to={`/flower/${flower.id}`}>
                      <img src={flower.image_url} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
