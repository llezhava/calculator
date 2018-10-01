function getCalculatorFn(operator) {
  switch (operator) {
    case "+":
      return add;
    case "-":
      return subtract;
    case "/":
      return divide;
    case "*":
      return multiply;
    default:
      return ({ previousValue, currentValue }) => {
        console.log("Unknown operator!", operator);
      };
  }
}

function add({ previousValue, currentOutput }) {
  let result = Number(previousValue) + Number(currentOutput);
  return result.toString();
}

function subtract({ previousValue, currentOutput }) {
  let result = Number(previousValue) - Number(currentOutput);
  return result.toString();
}

function divide({ previousValue, currentOutput }) {
  let result = Number(previousValue) / Number(currentOutput);
  return result.toString();
}

function multiply({ previousValue, currentOutput }) {
  let result = Number(previousValue) * Number(currentOutput);
  return result.toString();
}

export default getCalculatorFn;
