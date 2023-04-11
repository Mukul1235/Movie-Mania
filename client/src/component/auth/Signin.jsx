import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, signInUser } from "../../api/auth";
import { useAuth, useNotification, useTheme } from "../../hooks";
import { commonTheme } from "../../utils/CommonTheme";
import { isValidEmail } from "../../utils/isValidEmail";

import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validator = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid Email" }; //Checking validity of Email This will Check Whether

  if (!password.trim()) return { ok: false, error: "Password is missing" };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters long!" };

  return { ok: true };
};
const Signin = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { authInfo, handleLogin } = useAuth();
  const { isPending, isLoggedIn } = authInfo;
  // console.log(authInfo);
  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    //destructuring the e.target
    const { value, name } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validator(userInfo);

    if (!ok) updateNotification("error", error);
    handleLogin(userInfo.email, userInfo.password);

  };
  // useEffect(() => {
  //   if(isLoggedIn) navigate('/')
  // }, [isLoggedIn])
  // console.log(isPending)
  // isPending = false;

  return (
    <FormContainer>
      <Container>
        <form className={commonTheme + " w-72"} onSubmit={handleSubmit}>
          <Title> Sign in</Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign In" busy={isPending} />
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default Signin;
