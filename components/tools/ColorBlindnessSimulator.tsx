"use client";

import { useState, useRef } from "react";
import { Eye, Upload, RefreshCw, Info } from "lucide-react";

type ColorBlindnessType = "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";

interface ColorBlindnessInfo {
  name: string;
  description: string;
  prevalence: string;
}

const colorBlindnessInfo: Record<ColorBlindnessType, ColorBlindnessInfo> = {
  normal: {
    name: "Normal Vision",
    description: "Standard color vision with all three types of cone cells functioning normally",
    prevalence: "Approximately 8% of males and 0.5% of females"
  },
  protanopia: {
    name: "Protanopia (Red-Blind)",
    description: "Complete absence of red cone cells. Red, orange, and yellow colors appear shifted toward green",
    prevalence: "Approximately 1% of males"
  },
  deuteranopia: {
    name: "Deuteranopia (Green-Blind)",
    description: "Complete absence of green cone cells. Red and green colors are difficult to distinguish",
    prevalence: "Approximately 1% of males"
  },
  tritanopia: {
    name: "Tritanopia (Blue-Blind)",
    description: "Complete absence of blue cone cells. Blue and yellow colors are difficult to distinguish",
    prevalence: "Approximately 0.01% of males and females"
  },
  achromatopsia: {
    name: "Achromatopsia (Complete Color Blindness)",
    description: "Complete absence of cone function, seeing only in shades of gray",
    prevalence: "Approximately 0.003% of males and females"
  }
};

export default function ColorBlindnessSimulator() {
  const [image, setImage] = useState<string | null>(null);
  const [colorBlindnessType, setColorBlindnessType] = useState<ColorBlindnessType>("normal");
  const [previewColor, setPreviewColor] = useState("#ff0000");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Color blindness simulation matrices
  const colorBlindnessMatrices: Record<ColorBlindnessType, number[][]> = {
    normal: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ],
    protanopia: [
      [0.567, 0.433, 0],
      [0.558, 0.442, 0],
      [0, 0.242, 0.758]
    ],
    deuteranopia: [
      [0.625, 0.375, 0],
      [0.7, 0.3, 0],
      [0, 0.3, 0.7]
    ],
    tritanopia: [
      [0.95, 0.05, 0],
      [0, 0.433, 0.567],
      [0, 0.475, 0.525]
    ],
    achromatopsia: [
      [0.299, 0.587, 0.114],
      [0.299, 0.587, 0.114],
      [0.299, 0.587, 0.114]
    ]
  };

  const simulateColor = (hex: string, type: ColorBlindnessType): string => {
    const rgb = {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    };

    const matrix = colorBlindnessMatrices[type];
    const r = rgb.r * matrix[0][0] + rgb.g * matrix[0][1] + rgb.b * matrix[0][2];
    const g = rgb.r * matrix[1][0] + rgb.g * matrix[1][1] + rgb.b * matrix[1][2];
    const b = rgb.r * matrix[2][0] + rgb.g * matrix[2][1] + rgb.b * matrix[2][2];

    const toHex = (c: number) => Math.min(255, Math.max(0, Math.round(c))).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const processImage = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) return;

      const data = imageData.data;
      const matrix = colorBlindnessMatrices[colorBlindnessType];

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i] = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
        data[i + 1] = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
        data[i + 2] = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];
      }

      ctx?.putImageData(imageData, 0, 0);
    };
  };

  const simulatedColor = simulateColor(previewColor, colorBlindnessType);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-rose-100 rounded-2xl">
              <Eye className="h-6 w-6 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Color Blindness Simulator</h2>
          </div>
          <p className="text-gray-500">Simulate how colors appear to people with different types of color blindness</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Color Blindness Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {(Object.keys(colorBlindnessInfo) as ColorBlindnessType[]).map((type) => (
              <button
                key={type}
                onClick={() => setColorBlindnessType(type)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  colorBlindnessType === type
                    ? "border-rose-500 bg-rose-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Eye className={`h-5 w-5 ${colorBlindnessType === type ? "text-rose-600" : "text-gray-400"}`} />
                </div>
                <p className="text-xs font-semibold text-gray-700 text-center">
                  {type === "normal" ? "Normal" : type.charAt(0).toUpperCase() + type.slice(1)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">{colorBlindnessInfo[colorBlindnessType].name}</p>
              <p className="text-sm text-blue-800 mt-1">{colorBlindnessInfo[colorBlindnessType].description}</p>
              <p className="text-xs text-blue-600 mt-2">{colorBlindnessInfo[colorBlindnessType].prevalence}</p>
            </div>
          </div>
        </div>

        {/* Single Color Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Preview</h3>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="space-y-4 w-full md:w-auto">
              <p className="text-sm font-medium text-gray-500">Original Color</p>
              <div
                className="w-24 h-24 rounded-2xl shadow-inner border border-gray-100"
                style={{ backgroundColor: previewColor }}
              />
              <input
                type="color"
                value={previewColor}
                onChange={(e) => setPreviewColor(e.target.value)}
                className="w-full h-10 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-center">
              <RefreshCw className="h-8 w-8 text-gray-300" />
            </div>

            <div className="space-y-4 w-full md:w-auto">
              <p className="text-sm font-medium text-gray-500">
                How it looks to {colorBlindnessType === "normal" ? "normal vision" : colorBlindnessType}
              </p>
              <div
                className="w-24 h-24 rounded-2xl shadow-inner border border-gray-100"
                style={{ backgroundColor: simulatedColor }}
              />
              <p className="text-center font-mono text-sm text-gray-600">{simulatedColor}</p>
            </div>
          </div>
        </div>

        {/* Image Upload & Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Simulator</h3>
          
          {!image ? (
            <div className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50">
              <Upload className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400 font-bold uppercase">Upload Image to Simulate</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-500">Original Image</p>
                <img src={image} alt="Original" className="w-full rounded-xl border border-gray-200" />
              </div>
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-500">
                  Simulated: {colorBlindnessInfo[colorBlindnessType].name}
                </p>
                <canvas ref={canvasRef} className="w-full rounded-xl border border-gray-200" />
                <button
                  onClick={processImage}
                  className="w-full h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-rose-700 transition-colors font-medium"
                >
                  <RefreshCw className="h-5 w-5" />
                  Apply Simulation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
