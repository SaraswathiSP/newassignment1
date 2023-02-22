import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import {Redirect} from 'react-router-dom'
import { FaGraduationCap, FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./loginphone.css";

class LoginPhone extends Component {
  state = {
    number: "",
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
    const { number } = this.state;
    const userDetails = { number };
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

  onChangeNumber = (event) => {
    this.setState({ number: event.target.value });
  };

  render() {
    const { number, errorMsg, showSubmitError } = this.state;

    // console.log(showSubmitError)
    // const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }
    console.log(errorMsg);
    return (
      <div className="login-phone-form-main-container">
        <div className="login-phone-form-container d-flex flex-column justify-content-center">
          <div className="login-phone-form-title-container d-flex flex-row justify-content-center">
            <div className="logo-container">
              <FaGraduationCap className="logo-icon" />
            </div>
            <h1 className="login-phone-form-title ">Learning</h1>
          </div>
          <div className="login-phone-form mt-3">
            <h1 className="login-phone-form-heading ">Welcome to Daway</h1>
            <p className="login-phone-form-description text-secondary">
              Please sing in here
            </p>
            <form className="form" onSubmit={this.submitForm}>
              <div className="login-phone-input-fields-container">
                <input
                  type="text"
                  placeholder="998888xxxxxxx"
                  required
                  className="login-phone-input-field"
                  value={number}
                  onChange={this.onChangeNumber}
                />
              </div>
              <div className="login-phone-agree-inputbox-container d-flex">
                <div className="login-phone-password-container">
                  <input
                    type="checkbox"
                    className="login-phone-checkbox-input"
                    id="agree"
                  />
                  <label
                    htmlFor="agree"
                    className="login-phone-checkbox-name text-secondary"
                  >
                    Remember me
                  </label>
                </div>
                <a href="/forgotpassword" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-2 mb-2">
                LOGIN
              </button>
              <div className="login-phone-agree-inputbox-container d-flex ">
                <span id="agree" className="sign-up-line text-secondary">
                  New to the Community?
                  <a href="/login" className="sign-up-link">
                    Create Account
                  </a>
                </span>
              </div>
            </form>
          </div>
          <div className="footer-container d-flex justify-content-center">
            <span className="sign-up-line">Signup with</span>
            <div className="signup-logos-container">
              <FaFacebook className="signup-logo facebook" />
              <FaTwitter className="signup-logo twitter" />
              <FcGoogle className="signup-logo google" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPhone;
