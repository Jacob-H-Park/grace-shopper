import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../store/order";
import { Paper } from "@mui/material";

const UserOrders = () => {
  const { user, orders } = useSelector((state) => ({
    user: state.auth,
    orders: state.pastOrders,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders(user.id));
  }, [user]);

  const paperStyle = {
    padding: 20,
    height: "700px",
    width: 500,
    margin: "20px auto",
  };

  if (orders) {
    const columns = [
      { field: "id", headerName: "Order ID", width: 90 },
      { field: "orderDate", headerName: "Order Date", width: 150 },
      { field: "tracking", headerName: "Tracking Number", width: 258 },
    ];

    const rows = orders.map((order) => {
      return {
        id: order.id,
        orderDate: order.updatedAt.slice(0, 10),
        tracking: "XXXX-XXXX-XXXX",
      };
    });

    return (
      <div>
        <Paper elevation={1} style={paperStyle}>
          <h1>Your Orders</h1>
          <DataGrid
            columns={columns}
            rows={rows}
            sx={{height: "600px"}}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Paper>
      </div>
    );
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default UserOrders;
