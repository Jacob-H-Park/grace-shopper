import React from "react";
import { connect } from "react-redux";
import { comparePass } from "../store";
import { updatePass } from "../store";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      oldPassword: "",
      isChanging: false,
      confirmPassword: "",
      error: "",
    };
    this.handleSubmit = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  validateForm() {
    return (
      this.state.oldPassword.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleClick = async (event) => {
    const { oldPassword } = this.state;
    console.log("change password");
    console.log(oldPassword);
    event.preventDefault();
    this.setState({ isChanging: true });
    try {
      if (await this.props.comparePassword(oldPassword)) {
        console.log("updating the password");
        this.props.updatePassword(this.state.password);
      }
    } catch (err) {
      alert(err.message);
      this.setState({ isChanging: false });
    }
  };

  render() {
    const { oldPassword, password, confirmPassword } = this.state;
    const { handleClick, handleChange } = this;
    return (
      <div>
        <h1>Change your password</h1>
        <form onSubmit={handleClick}>
          <div>
            <label htmlFor="password">Old Password:</label>
            <input
              name="oldPassword"
              type="password"
              onChange={handleChange}
              value={oldPassword}
            />
          </div>

          <div>
            <label htmlFor="password">New Password:</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <div>
            <label htmlFor="confirmpassword">Comfirm Password Password:</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={confirmPassword}
            />
          </div>

          <div>
            <button type="submit" disabled={!this.validateForm()}>
              Update Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = ({ auth }) => {
  return { auth };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    updatePassword: (password) => {
      dispatch(updatePass(password, history));
    },
    comparePassword: (oldPassword) => {
      return dispatch(comparePass(oldPassword));
    },
  };
};
export default connect(mapState, mapDispatch)(ChangePassword);
