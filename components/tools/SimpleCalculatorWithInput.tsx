"use client";

import { useState } from "react";
import { Calculator, Delete, Divide, Equal, Minus, Plus, X, Type } from "lucide-react";
import { ToolInput } from "@/components/ui/ToolInput";

export default function SimpleCalculatorWithInput() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");

  const handleNumber = (num: string) => {
    if (lastResult !== null) {
      setDisplay(num);
      setLastResult(null);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setLastResult(null);
    setCustomInput("");
  };

  const handleEqual = () => {
    try {
      const fullEquation = equation + display;
      // Using Function constructor as a safer alternative to eval for basic arithmetic
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${fullEquation.replace(/×/g, "*").replace(/÷/g, "/")}`)();
      setDisplay(String(result));
      setEquation("");
      setLastResult(String(result));
    } catch (error) {
      setDisplay("Error");
    }
  };

  const handleCustomCalculate = () => {
    if (customInput.trim()) {
      try {
        // eslint-disable-next-line no-new-func
        const result = new Function(`return ${customInput}`)();
        setDisplay(String(result));
        setLastResult(String(result));
        setCustomInput("");
      } catch (error) {
        setDisplay("Error");
      }
    }
  };

  const buttons = [
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
    { label: "C", onClick: handleClear, type: "clear", icon: Delete },
    { label: "+", onClick: () => handleOperator("+"), type: "operator", icon: Plus },
  ];

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gray-900 p-6 text-right">
          <div className="text-gray-400 text-sm h-6 mb-1 font-mono">{equation}</div>
          <div className="text-white text-4xl font-bold font-mono overflow-hidden truncate">
            {display}
          </div>
        </div>
        
        {/* Custom Input Section */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <ToolInput
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter expression (e.g., 2+3*4)"
            label="Custom Calculation"
            onKeyPress={(e) => e.key === 'Enter' && handleCustomCalculate()}
            icon={<Type className="h-5 w-5" />}
          />
          <button
            onClick={handleCustomCalculate}
            className="mt-3 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all active:scale-95"
          >
            Calculate Expression
          </button>
        </div>

        <div className="p-4 grid grid-cols-4 gap-3 bg-gray-50">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              className={`
                h-14 rounded-xl flex items-center justify-center text-xl font-bold transition-all active:scale-95
                ${btn.type === "number" ? "bg-white text-gray-700 hover:bg-gray-100 shadow-sm" : ""}
                ${btn.type === "operator" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : ""}
                ${btn.type === "clear" ? "bg-red-50 text-red-600 hover:bg-red-100" : ""}
              `}
            >
              {btn.icon ? <btn.icon className="h-6 w-6" /> : btn.label}
            </button>
          ))}
          <button
            onClick={handleEqual}
            className="col-span-4 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all active:scale-95 shadow-lg"
          >
            <Equal className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}