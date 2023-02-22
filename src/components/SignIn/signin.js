import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import {Redirect} from 'react-router-dom'
import { FaGraduationCap, FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./signin.css";

class SignIn extends Component {
  state = {
    password: "",
    email: "",
    errorMsg: "",
    showSubmitError: false,
    showPassword: false,
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
    const { password, email } = this.state;
    const userDetails = { password, email };
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

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onEye = () => {
    this.setState((preState) => ({ showPassword: !preState.showPassword }));
  };

  render() {
    const {
      username,
      password,
      email,
      errorMsg,
      showSubmitError,
      showPassword,
    } = this.state;

    console.log(showSubmitError);
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken);
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }
    console.log(errorMsg);
    return (
      <div className="login-form-main-container">
        <div className="login-form-container d-flex flex-column justify-content-center">
          <div className="login-form-title-container d-flex flex-row justify-content-center">
            <div className="logo-container">
              <FaGraduationCap className="logo-icon" />
            </div>
            <h1 className="login-form-title ">Learning</h1>
          </div>
          <div className="login-form mt-3">
            <h1 className="login-form-heading ">Welcome to Daway</h1>
            <p className="login-form-description text-secondary">
              Create to Account to join the community
            </p>
            <form className="form" onSubmit={this.submitForm}>
              <div className="input-fields-container">
                {/* <p className='error-message'>{nameErrorMsg}</p> */}
                <input
                  type="email"
                  placeholder="Email/phone no"
                  required
                  className="input-field"
                  value={email}
                  onChange={this.onChangeEmail}
                />
                {/* <p className='error-message'>{emailErrorMsg}</p> */}
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="password-input-field"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                  <button
                    className="eye-button"
                    type="button"
                    onClick={this.onEye}
                  >
                    {showPassword ? (
                      <BsEyeSlash className="eye-icon" />
                    ) : (
                      <BsEye className="eye-icon" />
                    )}
                  </button>
                </div>
              </div>
              <div className="agree-inputbox-container">
                <div className="forgot-password-container">
                  <input
                    type="checkbox"
                    className="checkbox-input "
                    id="agree"
                  />
                  <label
                    htmlFor="agree"
                    className="checkbox-name text-secondary"
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
              <div className="agree-inputbox-container d-flex ">
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

export default SignIn;
