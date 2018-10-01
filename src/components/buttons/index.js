import React from "react";
import Button from "./Button";
import numbers from "./numbers";
import operators from "./operators";
import commands from "./commands"

function Buttons({ clickHandler }) {
  function makeButtons(type, data, clickHandler) {
    let buttons = data.map((item, index) => (
      <Button value={item} type={type} clickHandler={clickHandler} key={index} />
    ));
    return buttons;
  }
  return (
    <section id="buttons">
      <div id="numbers">{makeButtons("number", numbers, clickHandler)}</div>
      <div id="operators">{makeButtons("operator", operators, clickHandler)}</div>
      <div id="commands">{makeButtons("command", commands, clickHandler)}</div>
    </section>
  );
}

export default Buttons;
