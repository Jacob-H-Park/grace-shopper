import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class UserInfo extends React.Component {
    constructor(){
        super()
    }
    render(){
        const {auth} = this.props
        return(
            <div>
                <div>Your Profile</div>
                <Link to ="/profile/edit">
                    <button>Edit</button>
                </Link>
                <h1>{auth.username}</h1>
                <h1>{auth.email}</h1>
                {auth.isAdmin ? (
                        <div>Admin</div>
                    ):(
                        <div>Customer</div>
                    )
                }
            </div>

        )   
    }
}
    

const mapState=({auth})=>{
    return {auth}
}



export default connect(mapState)(UserInfo)