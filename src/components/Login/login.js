import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import {Redirect} from 'react-router-dom'
import { FaGraduationCap, FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./login.css";
import { BsEyeSlash, BsEye } from "react-icons/bs";

class Login extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    errorMsg: "",
    showPassword: "",
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
    const { username, password, email } = this.state;
    const userDetails = { username, password, email };

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
      showPassword,
      showSubmitError,
    } = this.state;

    // console.log(showSubmitError)
    // const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }
    // console.log(errorMsg)
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
            <h1 className="login-form-heading ">Welcome to Ajay</h1>
            <p className="login-form-description text-secondary">
              Create to Account to join the community
            </p>
            <form className="form" onSubmit={this.submitForm}>
              <div className="category-checkbox-container d-flex flex-row">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="developer"
                    name="learning"
                    className="checkbox-input"
                  />
                  <label htmlFor="developer" className="checkbox-name">
                    Developer
                  </label>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="client"
                    name="learning"
                    className="checkbox-input"
                  />
                  <label htmlFor="client" className="checkbox-name">
                    Client
                  </label>
                </div>

                <div className="checkbox-container ">
                  <input
                    type="checkbox"
                    id="vender"
                    name="learning"
                    className="checkbox-input"
                  />
                  <label htmlFor="vender" className="checkbox-name">
                    Vender
                  </label>
                </div>
              </div>
              <div className="input-fields-container">
                <input
                  type="text"
                  placeholder="User name"
                  required
                  className="input-field"
                  value={username}
                  onChange={this.onChangeUsername}
                />
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
                {/* <p className='error-message'>{passwordErrorMsg}</p> */}
              </div>
              <div className="agree-inputbox-container d-flex flex-row justify-content-center align-items-center">
                <input type="checkbox" className="checkbox-input " id="agree" />
                <label htmlFor="agree" className="checkbox-name text-secondary">
                  I Agree with Terms & Condition
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-2 mb-2">
                LOGIN
              </button>
              <div className="agree-inputbox-container d-flex ">
                <span id="agree" className="sign-up-line text-secondary">
                  Member of the Community?
                  <Link to="/signin" className="sign-up-link">
                    Sign IN
                  </Link>
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

export default Login;
