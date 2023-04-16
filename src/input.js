import React, { useEffect, useState } from "react";
import { validate } from "./validators";


const INPUT_STATES = {
  UNTOUCHED: "UNTOUCHED",
  VALID: "VALID",
  INVALID: "INVALID",
};

const Input = (props) => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(INPUT_STATES.UNTOUCHED);
  const { type, label, id, validators, errorText } = props;

  const focusHandler = () => {
    if (validate(value, validators) === false) {
      setStatus(INPUT_STATES.INVALID);
    }
    if (validate(value, validators) === true) {
      setStatus(INPUT_STATES.VALID);
    }
    validate(value, validators);

  };

  useEffect(()=>{
    if(status!==INPUT_STATES.UNTOUCHED){
    if (validate(value, validators) === false) {
      setStatus(INPUT_STATES.INVALID);
    }
    if (validate(value, validators) === true) {
      setStatus(INPUT_STATES.VALID);
    }}
  })
  return (
    <div
      className={`form-input ${
        status === INPUT_STATES.INVALID && "form-input--invalid"
      }`}
      data-testid="form-input"
    >
      <label htmlFor={id}>{label}</label>
      <input
        onBlur={focusHandler}
        value={value}
        type={type}
        id={id}
        onChange={(e) => setValue(e.target.value)}
      />

      {status === INPUT_STATES.INVALID && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
