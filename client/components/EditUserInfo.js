import React,{Component} from "react";
import { connect } from "react-redux";
import { updateAuth } from "../store";
class EditUserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.auth.id ? this.props.auth.id: '',
            username: this.props.auth.username ? this.props.auth.username: '',
            email: this.props.auth.email ? this.props.auth.email: '',
            password:this.props.auth.password ? this.props.auth.password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.auth && this.props.auth) {
          console.log("update!");
          this.setState({
            id: this.props.auth.id,
            username: this.props.auth.name,
            email:this.props.auth.email
          });
        }
    }
    handleSubmit(ev) {
        ev.preventDefault();
        console.log('submit!',ev)
        this.props.updateUser(this.state.username,this.state.email,this.state.password)
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
        console.log(this.state)
    }
    render(){
        const { username, email } = this.state;
        const { handleSubmit, handleChange } = this;
        return(
            <div>
                <h1>Edit your Profile here</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">User Name:</label>
                    <input name="username" onChange={handleChange} value={username} />

                    <label htmlFor="email">Email:</label>
                    <input name="email" onChange={handleChange} value={email} />

                    <button type="submit">Update</button>
                </form>         
            </div>
        )
    }
}

const mapState = ({auth})=>{
    return {auth}
}
const mapDispatch = (dispatch, { history }) => {
    return {
      updateUser: (username,email,password) => {
        dispatch(updateAuth(username, email, password, history));
      },
    };
  };
export default connect(mapState,mapDispatch)(EditUserInfo);