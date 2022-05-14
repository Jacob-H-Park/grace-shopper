import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/users";
import { getAllOrders } from "../../../store/order";
import { Paper } from "@mui/material";
import faker from "faker";

const OrdersBoard = () => {
  const { users, allOrders } = useSelector((state) => ({
    users: state.users,
    allOrders: state.pastOrders,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getAllOrders());
  }, []);

  const paperStyle = {
    padding: 20,
    height: "700px",
    width: 610,
    margin: "20px auto",
  };

  if (allOrders) {
    const columns = [
      { field: "id", headerName: "Order ID", width: 90 },
      { field: "username", headerName: "User", width: 90 },
      { field: "orderDate", headerName: "Order Date", width: 150 },
      { field: "tracking", headerName: "Tracking Number", width: 160 },
      { field: "status", headerName: "Status", width: 110 }
    ];

    const rows = allOrders.map((order) => {
      const { username } = users.find(user => user.id === order.userId);
      const trackingNum = faker.random.number({min:1000, max:10000}) + '-' + faker.random.number({min:1000, max:10000}) + '-' + faker.random.number({min:1000, max:10000});
      return {
        id: order.id,
        username,
        orderDate: order.updatedAt.slice(0, 10),
        tracking: trackingNum,
        status: "completed"
      };
    });

    return (
      <div className="productList">
        <Paper elevation={1} style={paperStyle}>
          <h1>Orders Management</h1>
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

export default OrdersBoard;
