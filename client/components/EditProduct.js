import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProducts } from "../store/flowers";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    const { flowerToEdit } = this.props;
    this.state = {
      id: flowerToEdit ? flowerToEdit.id : "",
      name: flowerToEdit ? flowerToEdit.name : "",
      price: flowerToEdit ? flowerToEdit.price : 0,
      stock: flowerToEdit ? flowerToEdit.stock : 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.flowerToEdit && flowerToEdit) {
      console.log("update!");
      this.setState({
        id: flowerToEdit.id,
        name: flowerToEdit.name,
        price: flowerToEdit.price,
        stock: flowerToEdit.stock,
      });
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.updateProduct({ ...this.props.flowerToEdit, ...this.state });
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  render() {
    const { name, price, stock } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Product Name:</label>
          <input name="name" onChange={handleChange} value={name} />

          <label htmlFor="price">Price:</label>
          <input name="price" onChange={handleChange} value={price} />

          <label htmlFor="stock">Stock:</label>
          <input name="stock" onChange={handleChange} value={stock} />

          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

const mapState = ({ flowers }, { match }) => {
  const flowerToEdit = flowers.find(
    (flower) => flower.id === match.params.id * 1
  );
  return { flowerToEdit };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    updateProduct: (flower) => {
      dispatch(updateProducts(flower, history));
    },
  };
};
export default connect(mapState, mapDispatch)(EditProduct);
