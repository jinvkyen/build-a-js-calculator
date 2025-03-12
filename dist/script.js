const { useState } = React;

function Calculator() {
  const [input, setInput] = useState('0');
  const [expression, setExpression] = useState('');
  const [answer, setAnswer] = useState('');

  const handleNumberClick = nc => {
    if (input === "0" && nc !== ".") {
      setInput(nc);
    } else {
      setInput(input + nc);
    }
    setExpression(prev => prev + nc);
  };

  const handleOperatorClick = oc => {
    if (expression === "" && oc !== "-") return;

    setExpression(prev => {
      const match = prev.match(/([\+\-\*\/]+)$/);
      if (match) {
        const trailingOps = match[1];
        if (trailingOps.length >= 2) {
          return prev.slice(0, -trailingOps.length) + oc;
        } else {
          if (oc === "-") {
            // Allow negative sign to be appended.
            return prev + oc;
          } else {
            // Otherwise, replace the single operator with the new one.
            return prev.slice(0, -1) + oc;
          }
        }
      }
      // If there are no trailing operators, just append the new operator.
      return prev + oc;
    });

    setInput('');
  };


  const handleEqualSigns = () => {
    if (!expression) return;

    try {
      const result = eval(expression);
      setAnswer(result.toString());
      setInput(result.toString());
      setExpression(result.toString()); // Allow chaining calculations 
    } catch (error) {
      setAnswer("Error");
    }
  };

  const handleClear = () => {
    setInput('0');
    setExpression('');
    setAnswer('');
  };

  const handleDecimal = () => {
    if (!input.includes('.')) {
      setInput(input + '.');
      setExpression(expression + '.');
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "calculator" }, /*#__PURE__*/
    React.createElement("div", { className: "calculator-display" }, /*#__PURE__*/
    React.createElement("span", null, expression), /*#__PURE__*/
    React.createElement("div", { id: "display" }, answer || input || '0')), /*#__PURE__*/

    React.createElement("div", { className: "calculator-buttons" }, /*#__PURE__*/
    React.createElement("button", { id: "clear", className: "calculator-button wide", onClick: handleClear }, "AC"), /*#__PURE__*/
    React.createElement("button", { id: "divide", className: "calculator-button operator", onClick: () => handleOperatorClick('/') }, "\xF7"), /*#__PURE__*/
    React.createElement("button", { id: "multiply", className: "calculator-button operator", onClick: () => handleOperatorClick('*') }, "\xD7"), /*#__PURE__*/
    React.createElement("button", { id: "seven", className: "calculator-button", onClick: () => handleNumberClick('7') }, "7"), /*#__PURE__*/
    React.createElement("button", { id: "eight", className: "calculator-button", onClick: () => handleNumberClick('8') }, "8"), /*#__PURE__*/
    React.createElement("button", { id: "nine", className: "calculator-button", onClick: () => handleNumberClick('9') }, "9"), /*#__PURE__*/
    React.createElement("button", { id: "subtract", className: "calculator-button operator", onClick: () => handleOperatorClick('-') }, "-"), /*#__PURE__*/
    React.createElement("button", { id: "four", className: "calculator-button", onClick: () => handleNumberClick('4') }, "4"), /*#__PURE__*/
    React.createElement("button", { id: "five", className: "calculator-button", onClick: () => handleNumberClick('5') }, "5"), /*#__PURE__*/
    React.createElement("button", { id: "six", className: "calculator-button", onClick: () => handleNumberClick('6') }, "6"), /*#__PURE__*/
    React.createElement("button", { id: "add", className: "calculator-button operator", onClick: () => handleOperatorClick('+') }, "+"), /*#__PURE__*/
    React.createElement("button", { id: "one", className: "calculator-button", onClick: () => handleNumberClick('1') }, "1"), /*#__PURE__*/
    React.createElement("button", { id: "two", className: "calculator-button", onClick: () => handleNumberClick('2') }, "2"), /*#__PURE__*/
    React.createElement("button", { id: "three", className: "calculator-button", onClick: () => handleNumberClick('3') }, "3"), /*#__PURE__*/
    React.createElement("button", { id: "equals", className: "calculator-button equals", onClick: handleEqualSigns }, "="), /*#__PURE__*/
    React.createElement("button", { id: "zero", className: "calculator-button wide", onClick: () => handleNumberClick('0') }, "0"), /*#__PURE__*/
    React.createElement("button", { id: "decimal", className: "calculator-button", onClick: handleDecimal }, "."))));



}

ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById('app'));