import React from "react";
import { createProducts } from "../store/flowers";
import { connect } from "react-redux";
import axios from 'axios';

async function postImage({image}) {
    const formData = new FormData();
    formData.append("image", image)
    const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    return result.data
  }
  
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
            file:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileSelected = this.fileSelected.bind(this);
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }
    async handleSubmit(ev) {
        const { name, price, stock, category,description,file} = this.state;
        ev.preventDefault();
        const result = await postImage({image:file})
        const _imageUrl = result.imagePath
        this.setState({
            image_url: _imageUrl
        })
        const {image_url} = this.state
        const newFlower = {
            name,
            price,
            stock,
            category,
            description,
            image_url
        }
        this.props.createProduct({...newFlower})
    }
    fileSelected(ev) {
        console.log(ev.target.files)
        const file = ev.target.files[0]
        this.setState({
            file: file
        })
    }
    render(){
        const { name, price, stock, category,description} = this.state;
        const { handleSubmit, handleChange,fileSelected } = this;
        return(
            <div className="productList">
                <form onSubmit={handleSubmit}>
                    <label>Product Name:</label>
                    <input name = 'name' onChange={handleChange} value = {name}></input>
        
                    <label>Product Price:</label>
                    <input name = 'price' onChange={handleChange} value = {price}></input>
        
                    <label>Product Category:</label>
                    <select name = 'category' onChange={handleChange} value = {category}>
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
                    <input id='imageInput' type="file" accept ="image/*" onChange={fileSelected}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatch = (dispatch, ownProps) => {
    console.log('mapdispatch',ownProps)
    return {
      createProduct: (newFlower) => {
        dispatch(createProducts(newFlower,ownProps.history));
      },
    };
};


export default connect(null,mapDispatch)(AddProduct);