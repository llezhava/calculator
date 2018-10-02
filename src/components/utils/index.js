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

function add({ previousValue, currentValue }) {
  let result = Number(previousValue) + Number(currentValue);
  return result.toString();
}

function subtract({ previousValue, currentValue }) {
  let result = Number(previousValue) - Number(currentValue);
  return result.toString();
}

function divide({ previousValue, currentValue }) {
  let result = Number(previousValue) / Number(currentValue);
  return result.toString();
}

function multiply({ previousValue, currentValue }) {
  let result = Number(previousValue) * Number(currentValue);
  return result.toString();
}

export default getCalculatorFn;
