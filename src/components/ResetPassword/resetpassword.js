import { Component } from "react";
import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
// import {Redirect} from 'react-router-dom'
import { FaGraduationCap, FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./resetpassword.css";
import { BsEyeSlash, BsEye } from "react-icons/bs";

class ResetPassword extends Component {
  state = {
    newPassword: "",
    confirmPassword: "",
    email: "",
    errorMsg: "",
    showConPassword: "",
    showNewPassword: "",
    showSubmitError: false,
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    history.push("/");
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { newPassword, confirmPassword, email } = this.state;
    const userDetails = { newPassword, confirmPassword, email };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onChangeNewPassword = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  onChangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  onConEye = () => {
    this.setState((preState) => ({
      showConPassword: !preState.showConPassword,
    }));
  };

  onNewEye = () => {
    this.setState((preState) => ({
      showNewPassword: !preState.showNewPassword,
    }));
  };

  render() {
    const {
      newPassword,
      confirmPassword,
      email,
      errorMsg,
      showSubmitError,
      showConPassword,
      showNewPassword,
    } = this.state;

    console.log(showSubmitError);
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken);
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }
    console.log(errorMsg);
    return (
      <div className="reset-passward-form-main-container">
        <div className="reset-passward-form-container d-flex flex-column justify-content-center">
          <div className="reset-passward-form mt-3">
            <h1 className="reset-passward-form-heading ">Welcome to Daway</h1>
            <p className="reset-passward-form-description text-secondary">
              Change your existing password with new password
            </p>
            <form className="form" onSubmit={this.submitForm}>
              <div className="reset-passward-input-fields-container">
                {/* <input
                  type="password"
                  placeholder="New Password"
                  required
                  className="reset-passward-input-field"
                  value={email} 
                  onChange={this.onChangeNewPassword}
                /> */}
                <div className="password-input-container">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="password-input-field"
                    value={newPassword}
                    onChange={this.onChangeNewPassword}
                  />
                  <button
                    className="eye-button"
                    type="button"
                    onClick={this.onNewEye}
                  >
                    {showNewPassword ? (
                      <BsEyeSlash className="eye-icon" />
                    ) : (
                      <BsEye className="eye-icon" />
                    )}
                  </button>
                </div>
                <div className="password-input-container">
                  <input
                    type={showConPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="password-input-field"
                    value={confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                  />
                  <button
                    className="eye-button"
                    type="button"
                    onClick={this.onConEye}
                  >
                    {showConPassword ? (
                      <BsEyeSlash className="eye-icon" />
                    ) : (
                      <BsEye className="eye-icon" />
                    )}
                  </button>
                </div>
                {/* <input
                  type="password"
                  placeholder="confirm password"
                    required
                  className="reset-passward-input-field"
                  value={password}
                  onChange={this.onChangeConfirmPassword}
                /> */}
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2 mb-2">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
