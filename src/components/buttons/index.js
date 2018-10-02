import React from "react";
import Button from "./Button";
import numbers from "./numbers";
import operators from "./operators";
import commands from "./commands";

function Buttons({ clickHandler }) {
  function makeButtons(type, data, clickHandler) {
    let buttons = data.map((item, index) => (
      <Button
        value={item}
        type={type}
        clickHandler={clickHandler}
        key={index}
      />
    ));
    return buttons;
  }
  return (
    <section className="buttons">
      <div className="numbers">{makeButtons("number", numbers, clickHandler)}</div>
      <div className="operators">
        {makeButtons("operator", operators, clickHandler)}
      </div>
      <div className="commands">{makeButtons("command", commands, clickHandler)}</div>
    </section>
  );
}

export default Buttons;
