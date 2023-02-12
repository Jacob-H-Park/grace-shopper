import React, { Component } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import UploadIcon from "@mui/icons-material/Upload";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";

async function postImage({ image }) {
  const formData = new FormData();
  formData.append("image", image);
  const result = await axios.post("/api/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

const Input = styled("input")({
  display: "none",
});

class UploadPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      image: this.props.url,
    };
    this.handleUpload.bind(this);
    this.fileSelected = this.fileSelected.bind(this);
  }

  handleUpload = async (ev) => {
    const { file } = this.state;
    ev.preventDefault();
    ev.stopPropagation();
    const result = await postImage({ image: file });
    this.props.setUrl(result.imagePath);
    this.setState({
      image: result.imagePath,
    });
  };
  fileSelected(ev) {
    const file = ev.target.files[0];
    this.setState({
      file: file,
    });
  }

  render() {
    const { fileSelected, handleUpload } = this;
    const { image } = this.state;
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleUpload}>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={fileSelected}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
              Add Images
            </IconButton>
            <Button
              disabled={this.state.file ? false : true}
              variant="outlined"
              type="submit"
              startIcon={<UploadIcon />}
            >
              Upload
            </Button>
          </label>
        </form>

        {/* <form onSubmit={this.handleUpload}>
                    <input id='imageInput' type="file" accept ="image/*" onChange={fileSelected}></input> 
                    <Button variant="contained" type = 'submit' startIcon={<UploadIcon/>}>Upload</Button>
                </form> */}
        <Box
          sx={{
            display: "flex",
            "& > :not(style)": {
              m: 1,
              width: 150,
              height: 150,
            },
            justifyContent: "space-evenly",
          }}
        >
          <Paper variant="outlined" square>
            <img src={this.props.url} width="150px" height="150px" />
          </Paper>
          {/* <Paper variant="outlined" square /> */}
        </Box>
      </Box>
    );
  }
}

export default UploadPics;
