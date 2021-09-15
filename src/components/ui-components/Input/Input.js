import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div>
      <input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        style={props.style}
        name={props.name}
        onChange={props.onChange}
        required={props.required}
        value={props.value}
      />
    </div>
  );
};

export default Input;
