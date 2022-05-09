import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProducts } from "../store/flowers";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { autocompleteClasses, Button, Grid, Stack } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import UploadPics from "./UploadPics";
import LocalFloristSharpIcon from '@mui/icons-material/LocalFloristSharp';
import IconButton from '@mui/material/IconButton';

const categories = [
  "rose",
  "tulip",
  "orchid",
  "signature_bouquets",
  "sympathy",
  "preserved_rose",
];
const styles = theme => ({
  input: {
    height: 40
  },
  button: {
    width: 10
  },
  select: {
    height: 50,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  description: {
    height: 150
  }
});
class EditProduct extends Component {
  constructor(props) {
    super(props);
    const { flowerToEdit } = this.props;
    this.state = {
      id: flowerToEdit ? flowerToEdit.id : "",
      name: flowerToEdit ? flowerToEdit.name : "",
      price: flowerToEdit ? flowerToEdit.price : 0,
      stock: flowerToEdit ? flowerToEdit.stock : 0,
      category: flowerToEdit ? flowerToEdit.category : "",
      description: flowerToEdit ? flowerToEdit.description : "",
      image_url: flowerToEdit ? flowerToEdit.image_url : "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setUrl = this.setUrl.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.flowerToEdit && flowerToEdit) {
      console.log("update!");
      this.setState({
        id: flowerToEdit.id,
        name: flowerToEdit.name,
        price: flowerToEdit.price,
        stock: flowerToEdit.stock,
        category: flowerToEdit.category,
        description: flowerToEdit.description,
        image_url: flowerToEdit.image_url
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
  setUrl(url){
    this.setState({
        image_url:url
    })
  }
  render() {
    const { name, price, stock,category,description,image_url } = this.state;
    const { handleSubmit, handleChange,setUrl } = this;
    const {classes} = this.props
    if(!this.state.id){
      return null;
    }else{
      return (
        <div className="productList">
          <Box
            sx={{
              display: 'flex',
              width: "500px",
              height: "800px",
              flexDirection:'column',
              justifyContent :"center",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >  
            <Paper elevation = {12} >
              <div className="productList">
                <form onSubmit={handleSubmit}>
                  <Stack direction="column" spacing ={2} margin={2}> 
                    <IconButton color="primary"  component="span">
                        <LocalFloristSharpIcon />Edit Product
                    </IconButton>
                        
                    <TextField 
                      name="name" 
                      label="Product Name" 
                      variant="outlined" 
                      onChange={handleChange} 
                      value = {name} 
                      InputProps={{
                          className: classes.input
                      }}
                    />
                    <FormControl sx={{ m: 1}} size="small">
                        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                            <Select
                                name='category'
                                value={category}
                                onChange={handleChange}
                                input={<OutlinedInput label="category" />}
                            // MenuProps={MenuProps}
                            >
                            {categories.map((category) => (
                                <MenuItem
                                    key={category}
                                    value={category}
                                // style={getStyles(name, personName, theme)}
                                >
                                    {category}
                                </MenuItem>
                            ))}
                            </Select>
                    </FormControl>
                    <TextField 
                        name="price" 
                        label="Product Price" 
                        variant="outlined" 
                        onChange={handleChange} 
                        value = {price} 
                        InputProps={{
                            className: classes.input
                        }}
                    />      
                    <TextField 
                        name="stock" 
                        label="Product Stock" 
                        variant="outlined" 
                        onChange={handleChange} 
                        value = {stock} 
                        InputProps={{
                            className: classes.input
                        }}
                    />          
                    <TextField 
                      name="description" 
                      label="Product Description" 
                      variant="outlined" 
                      onChange={handleChange} 
                      value = {description} 
                      InputProps={{
                          className: classes.description
                      }}
                      multiline
                      maxRows={Infinity}
                    />
                    <div>
                      <UploadPics setUrl = {setUrl} url = {this.state.image_url}/>
                    </div>
                    <Button variant="contained" type="submit">Submit</Button>
                  </Stack>
                </form>
              </div>
            </Paper >
          </Box>
        </div> 
      );
    }
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

const styledApp = withStyles(styles)(EditProduct)
export default connect(mapState, mapDispatch)(styledApp);
