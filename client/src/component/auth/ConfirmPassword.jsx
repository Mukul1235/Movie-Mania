import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { commonTheme } from "../../utils/CommonTheme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";

export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  // isValid, !isValid
  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }
    setIsValid(true);
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we are verifying your token!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry the token is invalid!
          </h1>
        </Container>
      </FormContainer>
    );
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(password)
    if (!password.one.trim())
      return updateNotification("error", "password is missing");
    if (password.one.trim().length < 8)
      return updateNotification(
        "error",
        "Password must be at least 8 characters"
      );
    if (password.one != password.two)
      return updateNotification("error", "Password mismatch");
    const { message, error } = await resetPassword({
      newPassword: password,
      userId: id,
      token,
    });
    if (error) return updateNotification("error", error);
    navigate("/auth/signin", { replace: true }); //It's a redirect, replacing the current entry in the history stack versus PUSHing a new entry onto the top like a regular navigation.
    return updateNotification("success", message);
  };
  
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonTheme + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="********"
            value={password.one}
            name="one"
            onChange={handleChange}
            type="password"
          />
          <FormInput
            label="Confirm Password"
            placeholder="********"
            name="two"
            value={password.two}
            onChange={handleChange}
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
