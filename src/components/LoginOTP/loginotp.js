import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import {Redirect} from 'react-router-dom'
import { FaGraduationCap, FaFacebook, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./loginotp.css";

class LoginOTP extends Component {
  state = {
    otpNumber1: "",
    otpNumber2: "",
    otpNumber3: "",
    otpNumber4: "",
    otpNumber5: "",
    otpNumber6: "",
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
    const {
      otpNumber1,
      otpNumber2,
      otpNumber3,
      otpNumber4,
      otpNumber5,
      otpNumber6,
    } = this.state;
    const userDetails = {
      otpNumber1,
      otpNumber2,
      otpNumber3,
      otpNumber4,
      otpNumber5,
      otpNumber6,
    };
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

  onChangeotpNumber1 = (event) => {
    this.setState({ otpNumber1: event.target.value });
  };

  onChangeotpNumber2 = (event) => {
    this.setState({ otpNumber2: event.target.value });
  };

  onChangeotpNumber3 = (event) => {
    this.setState({ otpNumber3: event.target.value });
  };

  onChangeotpNumber4 = (event) => {
    this.setState({ otpNumber4: event.target.value });
  };

  onChangeotpNumber5 = (event) => {
    this.setState({ otpNumber5: event.target.value });
  };

  onChangeotpNumber6 = (event) => {
    this.setState({ otpNumber6: event.target.value });
  };

  render() {
    const {
      otpNumber1,
      otpNumber2,
      otpNumber3,
      otpNumber4,
      otpNumber5,
      otpNumber6,
      errorMsg,
      showSubmitError,
    } = this.state;

    const showResend =
      otpNumber1 !== "" &&
      otpNumber2 !== "" &&
      otpNumber3 !== "" &&
      otpNumber4 !== "" &&
      otpNumber5 !== "" &&
      otpNumber6 !== "";

    // console.log(showSubmitError)
    // const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    // if (jwtToken !== undefined) {
    //   return <Redirect to="/" />
    // }
    console.log(errorMsg);
    return (
      <div className="login-otp-form-main-container">
        <div className="login-otp-form-container d-flex flex-column justify-content-center">
          <div className="login-otp-form mt-3">
            <h1 className="login-otp-form-title ">
              Enter 6 Digit OTP for Login
            </h1>
            <div className="edit-number-container">
              <p className="login-otp-form-description text-secondary">
                Code sent to 998888xxxxx
              </p>
              <a href="/loginphone" className="edit-number">
                Edit Number
              </a>
            </div>
            <form className="form" onSubmit={this.submitForm}>
              <div className="login-otp-input-fields-container">
                <input
                  type="text"
                  //   placeholder="Enter OTP"
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber1}
                  onChange={this.onChangeotpNumber1}
                />
                <input
                  type="text"
                  //   placeholder="Enter OTP"
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber2}
                  onChange={this.onChangeotpNumber2}
                />
                <input
                  type="text"
                  //   placeholder="Enter OTP"
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber3}
                  onChange={this.onChangeotpNumber3}
                />
                <input
                  type="text"
                  //   placeholder="Enter OTP"
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber4}
                  onChange={this.onChangeotpNumber4}
                />
                <input
                  type="text"
                  //   placeholder="Enter OTP"
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber5}
                  onChange={this.onChangeotpNumber5}
                />
                <input
                  type="text"
                  //   placeholder="Enter OTP"
                  required
                  maxLength={1}
                  className="login-otp-input-field"
                  value={otpNumber6}
                  onChange={this.onChangeotpNumber6}
                />
              </div>

              <button
                type="submit"
                className={`otp-btn w-100 mt-2 mb-2 ${
                  showResend && "login-otp-button"
                }`}
              >
                LOGIN
              </button>
              {showResend && (
                <div className="login-otp-resend-container">
                  <p className="login-otp-resend text-secondary">
                    Haven't recieved the OTP?
                  </p>
                  <p className="otp-resend">Resend</p>
                </div>
              )}
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

export default LoginOTP;
