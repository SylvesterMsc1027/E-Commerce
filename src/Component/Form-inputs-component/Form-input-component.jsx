import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ lableTitle, ...otherprops }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherprops} />
      {lableTitle && (
        <label
          className={`${
            otherprops.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {lableTitle}
        </label>
      )}
    </div>
  );
};

export default FormInput;
