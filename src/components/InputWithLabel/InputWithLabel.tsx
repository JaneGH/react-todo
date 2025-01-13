import React, { useEffect, useRef } from "react";
import styles from "./InputWithLabel.module.css";
import { InputWithLabelProps } from "../../utils/types";

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
      <label htmlFor="todoTitle" className={styles.inputLabel}>
        {children}
      </label>
      <input
        id="todoTitle"
        name="title"
        type="text"
        value={value}
        onChange={onChange}
        ref={inputRef}
        className={styles.inputField}
      />
    </>
  );
};

export default InputWithLabel;
