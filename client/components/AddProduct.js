import React from "react";
import { createProducts } from "../store/flowers";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Grid, Stack } from "@mui/material";
import { withStyles } from "@mui/styles";
import UploadPics from "./UploadPics";
import LocalFloristSharpIcon from "@mui/icons-material/LocalFloristSharp";
import IconButton from "@mui/material/IconButton";

const categories = [
  "rose",
  "tulip",
  "orchid",
  "signature_bouquets",
  "sympathy",
  "preserved_rose",
];

const styles = (theme) => ({
  input: {
    height: 60,
  },
  button: {
    width: 10,
  },
  selectRoot: {
    height: 40,
    display: "table",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  description: {
    height: 150,
  },
});

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      image_url: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setUrl = this.setUrl.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  async handleSubmit(ev) {
    const { name, price, stock, category, description, image_url } = this.state;
    ev.preventDefault();

    const newFlower = {
      name,
      price,
      stock,
      category,
      description,
      image_url,
    };
    this.props.createProduct({ ...newFlower });
  }

  setUrl(url) {
    this.setState({
      image_url: url,
    });
  }
  render() {
    const { name, price, stock, category, description } = this.state;
    const { handleSubmit, handleChange, setUrl } = this;
    const { classes } = this.props;
    return (
      <div className="productList">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: "300",
              height: "500",
            },
            flexDirection: "column",
            justifyContent: "center",
            margin: 8,
          }}
        >
          <Paper elevation={12}>
            <div className="productList">
              <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={2} margin={2}>
                  <IconButton color="primary" component="span">
                    <LocalFloristSharpIcon />
                    Create Product
                  </IconButton>

                  <TextField
                    name="name"
                    label="Product Name"
                    variant="outlined"
                    onChange={handleChange}
                    value={name}
                    InputProps={{
                      className: classes.input,
                    }}
                  />

                  <FormControl sx={{ m: 1 }}>
                    <InputLabel id="demo-multiple-name-label">
                      Category
                    </InputLabel>
                    <Select
                      name="category"
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
                    value={price}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                  <TextField
                    name="stock"
                    label="Product Stock"
                    variant="outlined"
                    onChange={handleChange}
                    value={stock}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                  <TextField
                    name="description"
                    label="Product Description"
                    variant="outlined"
                    onChange={handleChange}
                    value={description}
                    InputProps={{
                      className: classes.description,
                    }}
                    multiline
                    row={6}
                  />
                  <UploadPics setUrl={setUrl} />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Stack>
              </form>
            </div>
          </Paper>
        </Box>
      </div>
    );
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    createProduct: (newFlower) => {
      dispatch(createProducts(newFlower, ownProps.history));
    },
  };
};

const styledApp = withStyles(styles)(AddProduct);
export default connect(null, mapDispatch)(styledApp);
