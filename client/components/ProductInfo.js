import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, removeProducts } from "../store/flowers";
import {Stack} from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box } from "@mui/system";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
    console.log(this.state)
    this.setState({
      category: ev.target.value
    });
  }

  render() {
    const { flowers, removeProducts } = this.props;
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
                <Button variant="contained" startIcon={<ModeEditIcon/>}>Edit</Button>
              </Link>
              <Button variant="contained" startIcon={<DeleteIcon/>}
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
    const categoryList = [
      {label:"all"},
      {label:"rose"},
      {label:"tulip"},
      {label:"orchid"},
      {label:"signature_bouquets"},
      {label:"sympathy"},
      {label:"preserved_rose"},
    ]
    const checkedIcon = <CheckBoxIcon fontSize="medium" />;
    const icon = <CheckBoxOutlineBlankIcon fontSize="medium" />;

    return (
      <div>
        <Box sx={
          {
            display: "flex",
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          direction="row" 
          spacing={5}
        >
          <Link to='/add_product'>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Fab variant='extended' size = 'medium' color="primary" aria-label="add">
                <AddIcon sx={{mr:1}}/>
                  Add product 
              </Fab>
            </Box>
          </Link>
          <Autocomplete
            sx={{ 
              width: 400,
              height: 80,
              alignItems:"center"
            }}
            multiple
            id="check-box-category"
            options={categoryList}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Category" />
            )}
          />
        </Box>
       
        {/* <div>
          <label htmlFor="flower-category"></label>
          <select name="name" id="flower-category" onChange={this.handleChange} value ={category}>
           <option value="all">All</option>
            <option value="rose">Roses</option>
            <option value="tulip">Tulips</option>
            <option value="orchid">Orchids</option>
            <option value="signature_bouquets">Signature Bouquets</option>
            <option value="sympathy">Sympathy</option>
            <option value="preserved_rose">Preserved Roses</option>
          </select>
        </div> */}

        <div style={{height: 605, width: '100%'}}>
          <DataGrid
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            rowHeight={85}
            headerHeight ={40}
            rows={flowers}
            columns={columns}
            pageSize={6}
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
