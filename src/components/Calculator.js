import React, { Component } from "react";
import "../App.css";
import Display from "./display";
import Buttons from "./buttons";
import getCalculatorFn from "./utils"

const initialState = {
  history: "",
  currentOutput: 0,
  isEnteringValue: false,
  previousValue: 0,
  currentValue: 0,
  currentFunction: false
};

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: "",
      currentOutput: "0",
      isEnteringValue: false,
      previousValue: "0",
      currentValue: "0",
      currentFunction: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.pressedCommand = this.pressedCommand.bind(this);
  }

  handleClick(type, event) {
    let button = event.target;
    let value = button.value;
    event.preventDefault();

    switch (type) {
      case "number":
        this.pressedNumber(value);
        break;
      case "operator":
        this.pressedOperator(value);
        break;
      case "command":
        this.pressedCommand(value);
        break;
      default:
        console.log("Pressed unknown command", button, value);
    }

    return "";
  }

 createCalculation(type, value, inputs) {
   let isReady =!this.areAllValuesUndefined(inputs)
   if(isReady) return isReady

   let fn =undefined

   switch(type) {
    case "number":
    this.pressedNumber(value);
    break;
  case "operator":
    this.pressedOperator(value);
    break;
  case "command":
    this.pressedCommand(value);
    break;
  default:
    console.log("Pressed unknown command", "button", value);
   }

}

areAllValuesUndefined(c) {
  return Object.keys(c).map(key => c[key]).includes(undefined)
}



pressedNumber(value) {
  // Convert currentOutput to String
  let currentOutput = this.state.currentOutput
  let isEnteringValue = this.state.isEnteringValue;
  if (currentOutput === "0") currentOutput = "";
  if (!isEnteringValue) currentOutput = "";

  currentOutput += value;
  this.setState({
    currentValue: currentOutput,
    currentOutput,
    isEnteringValue: true
  });
  return value;
}

evaluateCurrentFunction() {
  let currentFunction = this.state.currentFunction;

  if (currentFunction) {
    let newOutput = currentFunction(this.state);
    return newOutput;
  } else {
    return this.state.currentOutput;
  }
}

pressedOperator(value) {
  let currentOutput = this.evaluateCurrentFunction();
  let newFunction = getCalculatorFn(value);

  if(!this.state.isEnteringValue) {
    let history = this.replaceLastCharacter(this.state.history, value)
    this.setState({currentFunction: newFunction, history})
    return
  }

  let previousValue = currentOutput;
  let newHistory = this.getNewHistoryValue(value, this.state.currentValue);

  this.setState({
    history: newHistory,
    previousValue,
    isEnteringValue: false,
    currentFunction: newFunction,
    currentOutput
  });
  return value;
}

replaceLastCharacter(str, character) {
  let newStr = str.slice(0, str.length - 1) + character
  return newStr
}

pressedCommand(value) {
  switch (value) {
    case "=":
      this.equalsCommand();
      break;
    case "<":
      this.backSpaceCommand();
      break;
    case "C":
      this.clearCalculator();
      break;
  }

  return value;
}

equalsCommand() {
  let currentOutput = this.evaluateCurrentFunction();
  let history = ``

  this.setState(prevState => {
    let currentState = {...prevState, currentOutput, history};
    return currentState;
  });
}

backSpaceCommand() {
  let currentOutput = this.state.currentOutput;
  let newOutput = currentOutput.slice(0, currentOutput.length - 1) || "0"
  this.setState({ currentOutput: newOutput || "0" });
}



getNewHistoryValue(operator, currentValue) {
  let newHistory = this.state.history + `${currentValue}${operator}`;

  return newHistory;
}

clearCalculator() {
  this.setState(initialState);
}

render() {
  return (
    <div className="calculator">
      <Display
        history={this.state.history}
        currentOutput={this.state.currentOutput}
      />
      <Buttons clickHandler={this.handleClick} />
    </div>
  );
}
}

export default Calculator;
