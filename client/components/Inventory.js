import React from "react";
import { connect } from "react-redux";
import { fetchProducts, removeProducts } from "../store/flowers";
import EditProdcut from "./EditProduct";
class ProductInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            isFormVisible: false,
            id: null
        }
    };
    componentDidMount(){
        this.props.loadProducts();
    }
    render(){
        const {flowers, removeProducts} = this.props;
        return(
            <div>
                {flowers.map((flower)=>{
                    return <div id={flower.id}>
                                <ul>{flower.name}</ul>
                                <p>Price:{flower.price} Stock:{flower.stock}</p>
                                <button onClick={()=>{
                                    this.setState({ isFormVisible: true, id: flower.id})
                                }}>edit</button>
                                
                                <button onClick={()=>{
                                    removeProducts(flower.id)
                                }}>remove product</button>
                           </div>
                })}
                { this.state.isFormVisible ? <EditProdcut id = {this.state.id}/> : null}
            </div>
        )
    }

}
const mapState = (state)=>{
    return state
}

const mapDispatch = (dispatch) => {
    return {
      loadProducts: () => dispatch(fetchProducts()),
      removeProducts: (id)=> dispatch(removeProducts(id))
    };
};
export default connect(mapState,mapDispatch)(ProductInfo);