import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import {Redirect} from 'react-router-dom'
import { FaGraduationCap, FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./forgotpassword.css";

class ForgotPassword extends Component {
  state = {
    email: "",
    errorMsg: "",
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
    const { email } = this.state;
    const userDetails = { email };
    console.log(userDetails);
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    const { email, showSubmitError, errorMsg } = this.state;

    console.log(showSubmitError);
    // const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }
    console.log(errorMsg);
    return (
      <div className="forgot-password-form-main-container">
        <div className="forgot-password-form-container d-flex flex-column justify-content-center">
          <div className="forgot-password-form mt-3">
            <h1 className="forgot-password-form-heading ">Welcome to Daway</h1>
            <p className="forgot-password-form-description text-secondary">
              Enter your Email or Phone to Reset Password
            </p>
            <form className="form" onSubmit={this.submitForm}>
              <div className="forgot-password-input-fields-container">
                <input
                  type="email"
                  placeholder="Email/phone no"
                  required
                  className="forgot-password-input-field"
                  value={email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2 mb-2">
                LOGIN
              </button>
              <div className="back-to-login-container">
                <a href="/login" className="back-to-login">
                  BACK TO LOGIN
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
