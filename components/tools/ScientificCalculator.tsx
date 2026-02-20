"use client";

import { useState } from "react";
import { Divide, Equal, Minus, Plus, X, RotateCcw } from "lucide-react";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isDegree, setIsDegree] = useState(true);

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const handleFunction = (func: string) => {
    const val = parseFloat(display);
    let result: number;
    
    switch (func) {
      case "sin":
        result = isDegree ? Math.sin(val * Math.PI / 180) : Math.sin(val);
        break;
      case "cos":
        result = isDegree ? Math.cos(val * Math.PI / 180) : Math.cos(val);
        break;
      case "tan":
        result = isDegree ? Math.tan(val * Math.PI / 180) : Math.tan(val);
        break;
      case "log":
        result = Math.log10(val);
        break;
      case "ln":
        result = Math.log(val);
        break;
      case "sqrt":
        result = Math.sqrt(val);
        break;
      case "pow2":
        result = Math.pow(val, 2);
        break;
      case "pi":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
      default:
        return;
    }
    setDisplay(String(Number(result.toFixed(8))));
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  const handleEqual = () => {
    try {
      const fullEquation = equation + display;
       
      const result = new Function(`return ${fullEquation.replace(/×/g, "*").replace(/÷/g, "/")}`)();
      setDisplay(String(result));
      setEquation("");
    } catch (_) {
      setDisplay("Error");
    }
  };

  const buttons = [
    { label: "sin", onClick: () => handleFunction("sin"), type: "func" },
    { label: "cos", onClick: () => handleFunction("cos"), type: "func" },
    { label: "tan", onClick: () => handleFunction("tan"), type: "func" },
    { label: "DEG/RAD", onClick: () => setIsDegree(!isDegree), type: "toggle", active: isDegree },
    { label: "log", onClick: () => handleFunction("log"), type: "func" },
    { label: "ln", onClick: () => handleFunction("ln"), type: "func" },
    { label: "√", onClick: () => handleFunction("sqrt"), type: "func" },
    { label: "x²", onClick: () => handleFunction("pow2"), type: "func" },
    { label: "π", onClick: () => handleFunction("pi"), type: "func" },
    { label: "e", onClick: () => handleFunction("e"), type: "func" },
    { label: "(", onClick: () => handleNumber("("), type: "number" },
    { label: ")", onClick: () => handleNumber(")"), type: "number" },
    { label: "7", onClick: () => handleNumber("7"), type: "number" },
    { label: "8", onClick: () => handleNumber("8"), type: "number" },
    { label: "9", onClick: () => handleNumber("9"), type: "number" },
    { label: "÷", onClick: () => handleOperator("/"), type: "operator", icon: Divide },
    { label: "4", onClick: () => handleNumber("4"), type: "number" },
    { label: "5", onClick: () => handleNumber("5"), type: "number" },
    { label: "6", onClick: () => handleNumber("6"), type: "number" },
    { label: "×", onClick: () => handleOperator("*"), type: "operator", icon: X },
    { label: "1", onClick: () => handleNumber("1"), type: "number" },
    { label: "2", onClick: () => handleNumber("2"), type: "number" },
    { label: "3", onClick: () => handleNumber("3"), type: "number" },
    { label: "-", onClick: () => handleOperator("-"), type: "operator", icon: Minus },
    { label: "0", onClick: () => handleNumber("0"), type: "number" },
    { label: ".", onClick: () => handleNumber("."), type: "number" },
    { label: "C", onClick: handleClear, type: "clear", icon: RotateCcw },
    { label: "+", onClick: () => handleOperator("+"), type: "operator", icon: Plus },
  ];

  return (
    <div className="p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gray-900 p-8 text-right">
          <div className="text-blue-400 text-xs font-bold mb-2 uppercase tracking-widest">
            {isDegree ? "Degrees" : "Radians"} Mode
          </div>
          <div className="text-gray-400 text-sm h-6 mb-1 font-mono tracking-wider">{equation}</div>
          <div className="text-white text-5xl font-bold font-mono overflow-hidden truncate">
            {display}
          </div>
        </div>
        <div className="p-6 grid grid-cols-4 gap-4 bg-gray-50">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              className={`
                h-14 rounded-xl flex items-center justify-center text-lg font-bold transition-all active:scale-95
                ${btn.type === "number" ? "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-100" : ""}
                ${btn.type === "operator" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : ""}
                ${btn.type === "func" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : ""}
                ${btn.type === "clear" ? "bg-red-50 text-red-600 hover:bg-red-100" : ""}
                ${btn.type === "toggle" ? (btn.active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700") : ""}
              `}
            >
              {btn.icon ? <btn.icon className="h-5 w-5" /> : btn.label}
            </button>
          ))}
          <button
            onClick={handleEqual}
            className="col-span-4 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center text-3xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            <Equal className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
