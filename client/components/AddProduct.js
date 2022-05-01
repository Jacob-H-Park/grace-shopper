import React from "react";
import { createProducts } from "../store/flowers";
import { connect } from "react-redux";
class AddProduct extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            price: '',
            stock:'',
            category: '',
            description: '',
            image_url: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
        console.log(this.state)
    }
    handleSubmit(ev) {
        const { name, price, stock, category,description,image_url } = this.state;
        ev.preventDefault();
        console.log('submit!')
        this.props.createProduct(name,price,category,stock,description)
    }
    render(){
        const { name, price, stock, category,description,image_url } = this.state;
        const { handleSubmit, handleChange } = this;
        return(
            <div className="productList">
                <form onSubmit={handleSubmit}>
                    <label>Product Name:</label>
                    <input name = 'name' onChange={handleChange} value = {name}></input>
        
                    <label>Product Price:</label>
                    <input name = 'price' onChange={handleChange} value = {price}></input>
        
                    <label>Product Category:</label>
                    <select onChange={handleChange} value = {category}>
                        <option value="rose">Roses</option>
                        <option value="tulip">Tulips</option>
                        <option value="orchid">Orchids</option>
                        <option value="signature_bouquets">Signature Bouquets</option>
                        <option value="sympathy">Sympathy</option>
                        <option value="preserved_rose">Preserved Roses</option>
                    </select>
        
                    <label>Product Stock:</label>
                    <input name = 'stock' onChange={handleChange} value = {stock}></input>

                    <label>Description:</label>
                    <input name = 'description' onChange={handleChange} value = {description}></input>
        
                    {/* to be able to upload images*/}
                    <label>Product images:</label>
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatch = (dispatch, { history }) => {
    return {
      createProduct: (name,price,category,stock,description) => {
        dispatch(createProducts(name,price,category,stock, description, history));
      },
    };
  };


export default connect(null,mapDispatch)(AddProduct);