import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonTheme } from "../../utils/CommonTheme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validator = ({ name, email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Search for email validator regex
  const isValidName = /^[a-z A-Z]+$/;
  if (!name.trim()) return { ok: false, error: "Name is missing" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid Name" }; //Checking validity of Name  This will Check Whether name is Between Ato Z alphabets

  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email" }; //Checking validity of Email This will Check Whether

  if (!password.trim()) return { ok: false, error: "Password is missing" };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters long!" };

  return { ok: true };
};
const Signup = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = ({ target }) => {
    //destructuring the e.target
    const { value, name } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const { updateNotification } = useNotification();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validator(userInfo);

    if (!ok)updateNotification('error',error);

    const response = await createUser(userInfo);
    if (response.error) return updateNotification('error',response.error);

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,     //this will make use to not to go to prev page with arrows at top left corner
    }); //passing the user because we need userId
    // console.log(response.user);
  };
  const { name, email, password } = userInfo;
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonTheme + " w-72"}>
          <Title> Sign up</Title>
          <FormInput
            label="Name"
            placeholder="John Doe"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            placeholder="john@email.com"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            placeholder="********"
            name="password"
            value={password}
            type="password"
            onChange={handleChange}
          />
          <Submit value="Sign up" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default Signup;
