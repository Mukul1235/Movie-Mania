import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import Container from "../Container";


const NotVerified = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  // console.log(isLoggedIn);
  const isVerified = authInfo.profile?.isVerified;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/auth/verification", { state: { user: authInfo.profile } });
  };
  return (
    <Container>
      {isLoggedIn && !isVerified ? (
        <p className=" text-lg text-center bg-blue-50 p-2">
          It looks like you haven't verified your account,{" "}
          <button
            onClick={handleNavigate}
            className="text-blue-500 font-semibold hover:underline">
            click here to verify your account
          </button>
        </p>
      ) : null}
    </Container>
  );
};

export default NotVerified;
