import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import faker from "faker";
import "../style/widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function WidgetSm() {
  const users = useSelector(state => state.users);
  
  if (!users.length) {
    return null;
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Active Users</span>
      <ul className="widgetSmList">
        { users.map(user => 
            (<li className="widgetSmListItem">
                <img
                  src="https://images.pexels.com/photos/7155186/pexels-photo-7155186.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user.username}</span>
                  <span className="widgetSmUserTitle">{faker.address.country()}</span>
                </div>
                <Link to={"/user/" + user.id}>
                  <button className="widgetSmButton">
                    <VisibilityIcon className="widgetSmIcon" />
                    Display
                  </button>
                </Link>
             </li>) )}
      </ul>
    </div>
  );
}