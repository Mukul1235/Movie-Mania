import React from 'react'
import { commonTheme } from '../../utils/CommonTheme';
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from '../form/FormContainer';
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ConfirmPassword = () => {
    return (
      <FormContainer >
        <Container>
          <form className={commonTheme+" w-96"}>
            <Title>Enter New Password</Title>
            <FormInput
              label="New Password"
              placeholder="********"
              name="password"
              type="password"
            /> 
            <FormInput
              label="Confirm Password"
              placeholder="********"
              name="confirmpassword"
              type="password"
            />
            <Submit value="Confirm Password" />

          </form>
        </Container>
      </FormContainer>
    );
}

export default ConfirmPassword
