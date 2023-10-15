import React from "react";

import { keys, symbols } from "../../constants";

import "./KeyPad.css";

const KeyPad = ({ handleKeyPress }) => {
  return (
    <div className="keypad">
      <div className="keypad_keys">
        {keys.map((key, index) => {
          return (
            <div
              className="keypad_keys_key"
              key={index}
              onClick={() => handleKeyPress(key.keyCode, key.label)}
            >
              <p>{key.label}</p>
            </div>
          );
        })}
      </div>
      <div className="keypad_symbols">
        {symbols.map((symbol, index) => {
          return (
            <div
              className="keypad_symbols_symbol"
              key={index}
              onClick={() => handleKeyPress(symbol.keyCode, symbol.value)}
            >
              <p>{symbol.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyPad;
