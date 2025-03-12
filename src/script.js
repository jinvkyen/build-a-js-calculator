const { useState } = React;

function Calculator() {
  const [input, setInput] = useState('0');
  const [expression, setExpression] = useState('');
  const [answer, setAnswer] = useState('');

  const handleNumberClick = (nc) => {
    if (input === "0" && nc !== ".") {
      setInput(nc);
    } else {
      setInput(input + nc);
    }
    setExpression(prev => prev + nc);
  };

  const handleOperatorClick = (oc) => {
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

  return (
    <div className="calculator">
      <div className="calculator-display">
        <span>{expression}</span>
        <div id="display">{answer || input || '0'}</div>
      </div>
      <div className="calculator-buttons">
        <button id="clear" className="calculator-button wide" onClick={handleClear}>AC</button>
        <button id="divide" className="calculator-button operator" onClick={() => handleOperatorClick('/')}>÷</button>
        <button id="multiply" className="calculator-button operator" onClick={() => handleOperatorClick('*')}>×</button>
        <button id="seven" className="calculator-button" onClick={() => handleNumberClick('7')}>7</button>
        <button id="eight" className="calculator-button" onClick={() => handleNumberClick('8')}>8</button>
        <button id="nine" className="calculator-button" onClick={() => handleNumberClick('9')}>9</button>
        <button id="subtract" className="calculator-button operator" onClick={() => handleOperatorClick('-')}>-</button>
        <button id="four" className="calculator-button" onClick={() => handleNumberClick('4')}>4</button>
        <button id="five" className="calculator-button" onClick={() => handleNumberClick('5')}>5</button>
        <button id="six" className="calculator-button" onClick={() => handleNumberClick('6')}>6</button>
        <button id="add" className="calculator-button operator" onClick={() => handleOperatorClick('+')}>+</button>
        <button id="one" className="calculator-button" onClick={() => handleNumberClick('1')}>1</button>
        <button id="two" className="calculator-button" onClick={() => handleNumberClick('2')}>2</button>
        <button id="three" className="calculator-button" onClick={() => handleNumberClick('3')}>3</button>
        <button id="equals" className="calculator-button equals" onClick={handleEqualSigns}>=</button>
        <button id="zero" className="calculator-button wide" onClick={() => handleNumberClick('0')}>0</button>
        <button id="decimal" className="calculator-button" onClick={handleDecimal}>.</button>
      </div>
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById('app'));
