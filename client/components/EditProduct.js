
import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../store";
import { updateProducts } from "../store/flowers";


class EditProduct extends Component{
    constructor(props){
        super(props);
        const flower = this.props.flowers.find((flower)=> flower.id ===this.props.id);
        this.state = {
            id: flower.id,
            name: flower.name,
            price: flower.price,
            stock: flower.stock
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidUpdate(prevState) {
        if(prevState.id !== this.props.id){
            console.log('update!')
            const flower = this.props.flowers.find((flower)=> flower.id ===this.props.id);
            this.setState({
              id:flower.id,
              name: flower.name,
              price: flower.price,
              stock: flower.stock,
            });
        }
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
            
        });
        
    }
    render() {
        const { id,name,price,stock} = this.state;
        const { handleChange } = this;
        return (
            <div>
                <form 
                    onSubmit={(ev)=>{
                        ev.preventDefault()
                        console.log('submit!')
                        this.props.updateProduct(id,name,price,stock)
                        console.log('history',this.props.history)
                    }}
                >
                <label htmlFor='name'>Product Name:</label>
                <input name='name' onChange={handleChange} value={name} />
        
                <label htmlFor='price'>Price:</label>
                <input name='price' onChange={handleChange} value={price} />
        
                <label htmlFor='stock'>Stock:</label>
                <input name='stock' onChange={handleChange} value={stock} />
                
                <button type='submit'>Update</button>
                </form>
            </div>
        );
      }
}
    
const mapState = (state)=>{
    return state
}
const mapDispatch = (dispatch) => {
    return {
      updateProduct: (id,name,price,stock)=>{
          dispatch(updateProducts(id,name,price,stock))
      }
      
    };
};
export default connect(mapState,mapDispatch)(EditProduct)