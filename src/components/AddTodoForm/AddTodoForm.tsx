import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./AddTodoForm.module.css";
import { AddTodoFormProps } from "../../utils/types";
import InputWithLabel from "../InputWithLabel/InputWithLabel";


const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodoTitle(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedDate = event.target.value
      ? new Date(event.target.value)
      : null;
    setDueDate(selectedDate);
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const todoTitleStr = todoTitle.trim();
    if (todoTitleStr !== "") {
      onAddTodo({
        title: todoTitleStr,
        dueDate,
      });
      setTodoTitle("");
      setDueDate(null);
    }
  };

  const startSpeechRecognition = () => {
   const SpeechRecognition =
     (window as Window & typeof globalThis).SpeechRecognition ||
     (window as Window & typeof globalThis).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechResult = event.results[0][0].transcript;
      setTodoTitle(speechResult);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleAddTodo} className={styles["addTodoForm"]}>
      <InputWithLabel value={todoTitle} onChange={handleTitleChange}>
        Title
      </InputWithLabel>
      <button
        type="button"
        onClick={startSpeechRecognition}
        className={styles.micButton}
      >
        🎤
      </button>

      <label htmlFor="dueDate" className={styles.label}>
        Due Date
      </label>
      <input
        type="date"
        id="dueDate"
        value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
        onChange={handleDateChange}
        className={styles.input}
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
