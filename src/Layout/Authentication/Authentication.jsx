import React from "react";
import "./authentication.style.scss";
import SignUpForm from "../../Component/sign-up-form/sign-up-form.component.";
import SignInForm from "../../Component/sign-in-form/Sign-in-form.component";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
