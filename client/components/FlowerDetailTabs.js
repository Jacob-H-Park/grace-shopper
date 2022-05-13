import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FlowerDetailsTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <Box sx={{ bgcolor: "background.paper", width: 1, height: 300 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Packaging" {...a11yProps(1)} />
            <Tab label="Delivery" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Typography fontWeight="light">
              <Box>
                <Box fontStyle="oblique" fontWeight="bold">
                  Flowers:
                </Box>
                Premium Mondial pink roses
              </Box>
              <Box mt={2}>
                <Box fontStyle="oblique" fontWeight="bold">
                  Size:
                </Box>
                Stems are clipped to 15” and arranged in a tight, raffia-tied
                bouquet
              </Box>
              <Box mt={2}>
                <Box fontStyle="oblique" fontWeight="bold">
                  Care:
                </Box>
                We include flower food and instructions t`o help the blooms last
                5-7 days
              </Box>
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Typography fontWeight="light">
              This bouquet is hand-delivered in our 16″ signature gift box for
              deliveries in NYC, LA, Chicago, Philadelphia and Washington DC and
              arrives in a water-filled travel container so that the flowers
              stay hydrated. For all other locations, this bouquet is delivered
              in a special overnight delivery box and wrapped in a water-filled
              paper specifically designed to protect flowers during delivery.
              The blooms are topped with tissue paper for optimal protection. We
              print your note on our gift card, which is securely tucked to the
              side of the bouquet along with any vase or add-on.
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Typography fontWeight="light">
              We offer same-day delivery in NYC, Los Angeles, Chicago and
              Philadelphia every day and next-day delivery nationwide on a
              selection of flowers. The same-day delivery deadline is 5:00pm
              EST, except on the weekend, when the order deadline is 12:00pm on
              Saturday. The next-day delivery deadline is 5:00pm EST. For a full
              list of the cities we serve, please check our delivery zones.
            </Typography>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Box>
  );
}
