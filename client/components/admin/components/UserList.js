import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import "../style/userList.css";
import { removeUser } from "../../../store/users";


export default function UserList() {

  const users = useSelector(state => state.users);
  
  // The users are fetched and loaded already in the main panel (AdminDashboard.js) when clicking the Admin Board
  // Here again is to buy time for useSelector to grab the user list info when page's re-rendering
  if (!users.length) {
    return null;
  }
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => dispatch(removeUser(params.row.id))}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}