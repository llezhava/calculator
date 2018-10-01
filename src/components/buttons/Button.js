import React from "react";

/* 
Alternative approach: onClick={clickHandler.bind(this, type)}
*/

const Button = ({ value, type, clickHandler }) => {
  return (
    <button
      value={value}
      actionType={type}
      onClick={e => clickHandler(type, e)}
    >
      {value}
    </button>
  );
};

export default Button;
