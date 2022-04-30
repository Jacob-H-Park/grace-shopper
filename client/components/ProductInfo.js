import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { fetchProducts, removeProducts } from "../store/flowers";
import {Container, Grid, Stack} from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { grid } from "@mui/system";
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
    console.log('hey',flowers)
    const {category} = this .state
    const columns = [
      { field: 'image_url', 
        headerName: '', 
        width: 150,
        renderCell:(params)=>{
          return(
            <img src={params.value} width="100" height="100"></img>
          )
          
        }
      },
      {
        field: 'name',
        headerName: 'Product Name',
        width: 200,
        editable: false,
      },
      { 
        field: 'category',
        headerName: 'Category',
        width: 200,
        editable: false,
      },
      {
        field: 'stock',
        headerName: 'Stock',
        width: 150,
        editable: false,
      },
      {
        field: 'price',
        headerName: 'Price',
        width: 150,
        editable: false,
      },
      { field: 'id', 
        headerName: '', 
        width: 250,
        renderCell:(params)=>{
          return(
            <Stack direction="row" spacing={2}>
              <Link to={`/editflowerinfo/${params.value}`}>
                <Button variant="outlined" startIcon={<ModeEditIcon/>}>Edit</Button>
              </Link>
              <Button variant="outlined" startIcon={<DeleteIcon/>}
               onClick={()=>{
                  removeProducts(params.value)
                }
               }
              >Remove</Button>
            </Stack>

          )
        }
      },
    ];
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
        
        
          
            <div style={{height: 560, width: '100%'}}>
              <DataGrid
                rowHeight={90}
                headerHeight ={40}
                rows={this.props.flowers}
                columns={columns}
                pageSize={5}
                
                disableSelectionOnClick
                
         
              />
            </div>
              {/* {flowers.map((flower) => {
                return (
                  <Grid key={flower.id} container spacing={1}>
                    <Grid item xs = {1}>
                      <Item><img src={flower.image_url} width = "50" height= "50"/></Item>
                    </Grid>
                    <Grid item xs = {3}>
                      <Item>{flower.name}</Item>
                    </Grid>
                    <Grid item xs = {2}>
                      <Item>Stock: {flower.stock}</Item>
                    </Grid>
                    <Grid item xs = {2}>
                      <Item>Price: {flower.price}</Item>
                    </Grid>
                    <Grid item xs = {1}>
                      <Item>                    
                        <Link to={`/editflowerinfo/${flower.id}`}>
                            <button>Edit</button>
                        </Link>
                      </Item>
                    </Grid>
                    <Grid item xs = {1}>
                      <Item>
                        <button onClick={() => {removeProducts(flower.id);}}
                        >
                          Remove Product
                        </button>
                      </Item>
                    </Grid>

                  </Grid>
                );
              })}
            </div>
          ): (
            <Stack>
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
            </Stack>
          )*/} 
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
