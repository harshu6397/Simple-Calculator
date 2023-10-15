import React, { useRef } from "react";
import { useEffect } from "react";

import "./Header.css";

const Header = ({
  expression,
  result,
  history,
  showHistory,
  showResult,
  setHistory,
  theme,
}) => {
  const resultRef = useRef();

  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, []);

  return (
    <>
      {showHistory ? (
        <div className="header custom-scroll">
          <div className="header_history custom-scroll">
            {history?.map((historyItem, index) => (
              <div key={index}>
                <p style={{ color: theme === "dark" ? "#fbfcfc" : "#0b1537" }}>
                  {historyItem.expression}
                </p>
                <p style={{ color: theme === "dark" ? "#fbfcfc" : "#0b1537" }}>
                  ={historyItem.result}
                </p>
              </div>
            ))}
            {history?.length > 0 ? (
              <div
                className="header_history_clear_button"
                onClick={() => setHistory([])}
              >
                Clear history
              </div>
            ) : (
              <div style={{ color: theme === "dark" ? "#fbfcfc" : "#0b1537" }}>
                No history to show
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="header custom-scroll">
          {!showResult && (
            <div className="header_expression custom-scroll">
              <p>{expression}</p>
              <i></i>
            </div>
          )}

          <div
            className={showResult ? "header_result_big" : "header_result"}
            ref={resultRef}
          >
            <p className="result">{result}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
