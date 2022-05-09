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
import "./admin/style/productInfo.css";

class ProductInfo extends React.Component {
  constructor(){
    super(),
    this.state = {
      category: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.loadProducts();
  }
  handleChange(ev) {
    console.log(ev.target.value)
    this.setState({
      category: ev.target.value
    });
  }

  render() {
    const { flowers, removeProducts } = this.props;
    const {category} = this.state
    const flowersToRender = category.length === 0 ? flowers : flowers.filter((flower)=>{
      if(category.includes(flower.category)){
        return flower
      }
    })
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
              <Link to={`/admin/editflowerinfo/${params.value}`}>
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
      <div className="productList">
        <Box sx={
          {
            display: "flex",
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          direction="row" 
          spacing={5}
        >
          <Link to='/admin/add_product'>
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
            }}
            multiple
            id="category"
            options={categoryList}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            filterSelectedOptions
            onChange={(event,value)=>{
              const categoryList= value.map((v)=>{
                return v.label
              })
              this.setState({
                category: categoryList
              })
            }}
            renderOption={(props, option) => (
              <li {...props}>
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Category" />
            )}
          />
        </Box>

        <div style={{ height:'87%', width: '100%'}}>
          <DataGrid
            sx={{
              boxShadow: 2,
              backgroundColor: 'white'
            }}
            rowHeight={85}
            headerHeight ={40}
            rows={flowersToRender}
            columns={columns}
            pageSize={6}
            disableSelectionOnClick
          />
        </div>
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
