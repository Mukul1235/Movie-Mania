import React, { useState } from "react";
import { commonTheme } from "../../utils/CommonTheme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import { isValidEmail } from "../../utils/isValidEmail";

import Title from "../form/Title";
import { useNotification } from "../../hooks";
import { forgetpassword } from "../../api/auth";

const Password = () => {
  const [email, setemail] = useState("");
   
  const { updateNotification } = useNotification();
    const handleChange = ({ target }) => {
      const { value} = target;
    setemail(value);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      // const { ok, error } = validator(userInfo);
      if (!isValidEmail(email)) updateNotification("error", "Invalid Email");
   
      const { message, error } = await forgetpassword(email);
      if (error) updateNotification("error", "error");
      console.log(message);
      updateNotification("success", message);
    };
  return (
    <FormContainer>
      <Container>
        <form className={commonTheme+" w-96"} onSubmit={handleSubmit}>
          <Title>Please Enter Your Email</Title>
          <FormInput onChange={handleChange} value={email} label="Email" placeholder="john@email.com" name="email" />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}; 

export default Password;
