import React, { Component } from "react";
import "../App.css";
import Display from "./display";
import Buttons from "./buttons";
import getCalculatorFn from "./utils";

const initialState = {
  history: "",
  previousValue: "0",
  currentValue: "0",
  currentFunction: false,
  isEnteringValue: false
};

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: "",
      previousValue: "0",
      currentValue: "0",
      currentFunction: false,
      isEnteringValue: false
    };
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

  pressedNumber(value) {
    // Convert currentOutput to String
    let currentValue = this.state.currentValue;
    let isEnteringValue = this.state.isEnteringValue;
    if (currentValue === "0") currentValue = "";
    if (!isEnteringValue) currentValue = "";

    currentValue += value;
    this.setState({
      currentValue,
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
      return this.state.currentValue;
    }
  }

  pressedOperator(value) {
    debugger;
    let currentValue = this.evaluateCurrentFunction();
    let newFunction = getCalculatorFn(value);

    if (!this.state.isEnteringValue) {
      let history = this.replaceLastCharacter(this.state.history, value);
      this.setState({ currentFunction: newFunction, history });
      return;
    }

    let previousValue = currentValue;
    let newHistory = this.getNewHistoryValue(value, this.state.currentValue);

    this.setState({
      history: newHistory,
      previousValue,
      isEnteringValue: false,
      currentFunction: newFunction,
      currentValue
    });
    return value;
  }

  replaceLastCharacter(str, character) {
    let newStr = str.slice(0, str.length - 1) + character;
    return newStr;
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
      case "-+":
        this.negateCommand();
        break;
      default:
        console.log("Unexpected input");
    }

    return value;
  }

  equalsCommand() {
    let currentValue = this.evaluateCurrentFunction();
    this.setState(prevState => {
      let currentState = {
        ...initialState,
        currentValue,
        isEnteringValue: true
      };
      return currentState;
    });
  }

  backSpaceCommand() {
    let currentValue = this.state.currentValue + ``;
    let newOutput = currentValue.slice(0, currentValue.length - 1) || "0";
    this.setState({ currentValue: newOutput || "0" });
  }

  negateCommand() {
    let currentValue = this.state.currentValue;

    let number = -Number(currentValue).toString();

    this.setState({ currentValue: number });
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
          currentOutput={this.state.currentValue}
        />
        <Buttons clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default Calculator;