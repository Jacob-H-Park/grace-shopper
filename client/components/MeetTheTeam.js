import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function MeetTheTeam() {
  return (
    <ImageList sx={{ mt: 10, mb: 30 }} cols={4}>
      {itemData.map((item) => (
        <ImageListItem cols={1} key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://ca.slack-edge.com/T024FPYBQ-U02T627BWB0-4cde28d29b71-512",
    title: "Jacob Park",
    author: "@JacobPark",
  },
  {
    img: "/Images/carmen-profile.jpg",
    title: "Carmen Deng",
    author: "@CarmenDeng",
  },
  {
    img: "https://ca.slack-edge.com/T024FPYBQ-U02T627ETJS-29d60bae76d5-512",
    title: "Trevor Latimer",
    author: "@Trevor Latimer",
  },
  {
    img: "https://ca.slack-edge.com/T024FPYBQ-U02TF1K96JY-7e2c30ea697f-512",
    title: "Simon Cheng",
    author: "@Simon Cheng",
  },
];
