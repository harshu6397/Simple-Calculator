import React, { useState } from "react";

import Header from "./Components/Header/Header";
import KeyPad from "./Components/keyPad/KeyPad";

import sunImg from "./assets/sun.png";
import moonImg from "./assets/moon.png";
import historyImg from "./assets/history.png";

import { usedKeyCodes, numbers, operators } from "./constants";

import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleKeyPress = (keycode, key) => {
    if (showHistory) return;

    setShowResult(false);
    if (!keycode) return;
    if (!usedKeyCodes.includes(keycode)) return;

    if (numbers.includes(key)) {
      if (showResult === true) {
        setExpression(key);
        calculateResult(key);
      } else {
        calculateResult(expression + key);
        setExpression(expression + key);
      }
    } else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;

      setExpression(expression + key);
    } else if (key === ".") {
      if (!expression) return;
      if (expression.includes(".")) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;

      setExpression(expression + key);
    } else if (keycode === 8) {
      if (!expression) return;

      if (showResult === true) {
        setExpression("");
        setResult("");
      } else {
        calculateResult(expression.slice(0, -1));
        setExpression(expression.slice(0, -1));
      }
    } else if (keycode === 13) {
      if (!expression) return;
      calculateResult(expression);
      setHistory([
        ...history,
        {
          expression,
          result,
        },
      ]);
      if (showResult) {
        setShowResult(false);
        setExpression("");
        setResult("");
      } else {
        setShowResult(true);
      }
    }
  };

  const calculateResult = (expression) => {
    if (expression === "") setResult("0");
    if (!expression) return;
    const lastChar = expression.slice(-1);
    if (!numbers.includes(lastChar)) expression = expression.slice(0, -1);
    const res = eval(expression).toFixed(2) + "";
    setResult(res);
  };

  return (
    <div
      className="app"
      data-theme={theme}
      tabIndex="0"
      onKeyDown={(e) => handleKeyPress(e.keyCode, e.key)}
    >
      <div className="app_name">
        My Calculator 
      </div>
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="app_calculator_navbar_toggle"
                onClick={toggleTheme}
              >
                <div
                  className={`app_calculator_navbar_toggle_circle ${
                    theme === "dark"
                      ? "app_calculator_navbar_toggle_circle_active"
                      : ""
                  }`}
                />
              </div>
              <img
                src={theme === "light" ? sunImg : moonImg}
                alt="mode"
                className="app_calculator_navbar_image"
              />
            </div>
            <div
              className="app_calculator_navbar_history_icon"
              onClick={() => setShowHistory(!showHistory)}
            >
              <img
                src={historyImg}
                alt="app_calculator_navbar_history_icon"
                className="app_calculator_navbar_image"
              />
            </div>
          </div>
        </div>
        <Header
          expression={expression}
          result={result}
          history={history}
          setHistory={setHistory}
          showHistory={showHistory}
          showResult={showResult}
          theme={theme}
        />
        <KeyPad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;
