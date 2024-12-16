import React, { useEffect, useRef } from "react";
import { InputWithLabelProps } from "./types/types";

const InputWithLabel: React.FC<InputWithLabelProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { value, children, onChange } = props;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        id="todoTitle"
        name="title"
        type="text"
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
};

export default InputWithLabel;
