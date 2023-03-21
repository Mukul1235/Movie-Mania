import "./App.css";
import Signin from "./component/auth/Signin";
import Signup from "./component/auth/Signup";
import Navbar from "./component/user/Navbar";
import {Route,Routes} from "react-router-dom"
import Home from "./component/Home";
import EmailVerification from "./component/auth/EmailVerification";
import ForgetPassword from "./component/auth/ForgetPassword";
import ConfirmPassword from "./component/auth/ConfirmPassword";
import NotFound from "./component/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
