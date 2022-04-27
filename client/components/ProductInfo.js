import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts, removeProducts } from "../store/flowers";

class ProductInfo extends React.Component {
  constructor(){
    super(),
    this.state = {
      category: 'all'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.loadProducts();
  }
  handleChange(ev) {
    this.setState({
      category: ev.target.value
    });
    console.log(this.state)
  }
  render() {
    const { flowers, removeProducts } = this.props;
    const {category} = this .state

    return (
      <div>
        <Link to='/add_product'>
          <button>Add product</button>
        </Link>
        <div>
          <label htmlFor="flower-category"></label>
          <select name="name" id="flower-category" onChange={this.handleChange}>
           <option value="all">All</option>
            <option value="rose">Roses</option>
            <option value="tulip">Tulips</option>
            <option value="orchid">Orchids</option>
            <option value="signature_bouquets">Signature Bouquets</option>
            <option value="sympathy">Sympathy</option>
            <option value="preserved_rose">Preserved Roses</option>
          </select>
        </div>
        
        {
          category === 'all' ?(
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
          ): (
            <div>
              {flowers.filter((flower)=> flower.category === category).map((flower) => {
                return (
                  <div key={flower.id}>
                    <img src={flower.image_url} />
                    <p>Name: {flower.name}</p>
                    <p>Category:{flower.category}</p>
                    <p>Stock: {flower.stock}</p>
                    <p>Price: {flower.price}</p>
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
                  </div>);
              })}
            </div>
          )
        }
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
