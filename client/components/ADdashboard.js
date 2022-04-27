import React from "react";
import { Link } from "react-router-dom";

const ADdashboard = ()=>{
    return (
        <div>
            <Link to="/admin_products">View Products</Link>
            <Link to="/admin_orders">View Orders</Link>
        </div>

    )
}

export default ADdashboard;