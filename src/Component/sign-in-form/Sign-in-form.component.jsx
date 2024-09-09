import React, { useState } from "react";
import FormInput from "../Form-inputs-component/Form-input-component.jsx";
import Button from "../Button-component/Button-component.jsx";
import {
  createAuthUserDocumentFromAuth,
  signInWithGooglePopUp,
} from "../../Utils/Firebase/Firebase.utils.js";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };
  const login = async (e) => {
    try {
      await signInAuthUserDocumentFromUserAndPass(email, password);
      setformFields(defaultFormFields);
    } catch (error) {
      if (error.code == "auth/user-not-found") {
        alert("user not found");
      }
      if (error.code == "auth/wrong-password") {
        alert("Password is incorrect");
      }
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopUp();
    createAuthUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign In with you email and password</span>

      <form onSubmit={login}>
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

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>

          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
