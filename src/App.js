import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import SignIn from "./components/SignIn/signin";
import LoginPhone from "./components/LoginPhone/loginphone";
import LoginOTP from "./components/LoginOTP/loginotp";
import ForgotPassword from "./components/ForgotPassword/forgotpassword";

import "./App.css";
import ResetPassword from "./components/ResetPassword/resetpassword";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" component={Login} />
          <Route path="/signin" component={SignIn} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/loginphone" component={LoginPhone} />
          <Route path="resetpassword" component={ResetPassword} />
          <Route path="/loginotp" component={LoginOTP} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
