import React, { useState } from "react";
import "./login.style.scss";
import {
  createAuthUserDocumentFromUserAndPass,
  createAuthUserDocumentFromAuth,
} from "../../Utils/Firebase/Firebase.utils";
import FormInput from "../Form-inputs-component/Form-input-component.jsx";
import Button from "../Button-component/Button-component.jsx";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) return;
    try {
      const { user } = await createAuthUserDocumentFromUserAndPass(
        email,
        password
      );

      const loginResult = await createAuthUserDocumentFromAuth(user, {
        displayName,
      });
      setformFields(defaultFormFields);
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("user already exist");
      }
      if (error.code == "auth/weak-password") {
        alert("Password should be at least 6 characters");
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with you email and password</span>
      <form onSubmit={login}>
        <FormInput
          lableTitle="Display Name"
          value={displayName}
          type="text"
          required
          autoComplete="true"
          name="displayName"
          onChange={handleChange}
        />

        <FormInput
          lableTitle="Email"
          value={email}
          type="email"
          required
          autoComplete="true"
          name="email"
          onChange={handleChange}
        />

        <FormInput
          lableTitle="Password"
          value={password}
          type="password"
          required
          autoComplete="true"
          name="password"
          onChange={handleChange}
        />

        <FormInput
          lableTitle="Confirm Password"
          value={confirmPassword}
          type="password"
          required
          autoComplete="true"
          name="confirmPassword"
          onChange={handleChange}
        />

        <Button type="submit" buttonType="">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
