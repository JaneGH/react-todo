import React from "react";
import "./styles/theme.css"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import ChartPage from "./components/ChartPage/ChartPage";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className={styles.wrapper}>
          <div className={styles.appContainer}>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <React.Fragment>
                    <h1 className={styles.h1}>My Todo List</h1>
                    <TodoContainer
                      tableName={import.meta.env.VITE_TABLE_NAME}
                    />
                  </React.Fragment>
                }
              />
              <Route path="/chart" element={<ChartPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
