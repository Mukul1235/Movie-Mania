import React, { useEffect, useRef, useState } from "react";
import { commonTheme } from "../../utils/CommonTheme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/auth";
import { useNotification } from "../../hooks";

const OTP_LENGTH = 6;

const validOTP = (otp) => {
  let valid = false;
  for (let val of otp) {
    valid = !isNaN(parseInt(val)); //checking NAN value
    if (!valid) break;
  }
  return valid;
};
const EmailVerification = () => {
  const { state } = useLocation(); //it will tell exerything we have on this URL useLocation();
  const {updateNotification} = useNotification();
  const user = state?.user;
  // console.log(state);
  console.log(user);
  const [otp, setotp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const focusNextField = (index) => {
    setActiveOtpIndex(index + 1);
  };
  let currentOtpIndex; //this is created because as we use both onkeyDown and onChange because of that both get fire up when we type things so in order to deal with that we have to shift to currentOTPIndex instead of index
  const focusPrevField = (index) => {
    let nextIndex;
    let diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };
  const inputRef = useRef();

  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1, value.length); //substring will remove multiple number in one box
    if (!value) focusPrevField(currentOtpIndex);
    else focusNextField(currentOtpIndex);
    setotp([...newOtp]);
  };
  const navigate = useNavigate();
  const handleKeyDown = ({ key }, index) => {
    //this will {key} d-structure the e.key which tell which key is pressed
    currentOtpIndex = index;
    // console.log(key);
    if (key === "Backspace") {
      otp[currentOtpIndex] = "";
      focusPrevField(currentOtpIndex);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validOTP(otp)) return updateNotification("error", "Invalid OTP");

    const { message, error } = await verifyEmail({ OTP: otp.join(""), userId: user.id });   //otp.join("") it will join whole array like ['1','2','3','4','5','6']====> '123456'
    if (error) return updateNotification("error",error);

    updateNotification("success",message);
    // console.log(otp);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  // useEffect(() => {
  //   if (!user) return navigate("/Not-Found");
  // }, [user]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonTheme}>
          <div>
            <Title>Please enter your OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              {" "}
              OTP has been sent to your email{" "}
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 spin-button-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white text-primary font-semibold text spin-button-none"
                />
              );
            })}
          </div>
          <Submit value="Send Link" />
          <div className="flex justify-between"></div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
