"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Copy, Check, Image as ImageIcon, Palette, Download } from "lucide-react";

interface ExtractedColor {
  hex: string;
  rgb: string;
  percentage: number;
}

export default function ColorExtractor() {
  const [image, setImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [colorCount, setColorCount] = useState(8);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setExtractedColors([]);
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1).toUpperCase();
  };

  const extractColors = () => {
    if (!image || !canvasRef.current) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    if (!ctx || !img) {
      setIsProcessing(false);
      return;
    }

    img.onload = () => {
      const maxSize = 100;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const colorMap: Record<string, number> = {};

      for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i] / 32) * 32;
        const g = Math.round(data[i + 1] / 32) * 32;
        const b = Math.round(data[i + 2] / 32) * 32;
        const hex = rgbToHex(r, g, b);

        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }

      const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, colorCount)
        .map(([hex, count]) => {
          const rgb = hexToRgb(hex);
          const total = data.length / 4;
          return {
            hex,
            rgb: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "rgb(0, 0, 0)",
            percentage: Math.round((count / total) * 100)
          };
        });

      setExtractedColors(sortedColors);
      setIsProcessing(false);
    };
  };

  useEffect(() => {
    if (image) {
      extractColors();
    }
  }, [image, colorCount]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadPalette = () => {
    const paletteText = extractedColors.map((c, i) => `${i + 1}. ${c.hex} - ${c.percentage}%`).join("\n");
    const blob = new Blob([paletteText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color-palette.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getContrastColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000000";
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Color Extractor</h2>
          </div>
          <p className="text-gray-500">Extract dominant colors from an image</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Image</h3>
          
          {!image ? (
            <div className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50">
              <Upload className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400 font-bold uppercase">Drop image here or click to upload</p>
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
                <div className="relative">
                  <img
                    ref={imgRef}
                    src={image}
                    alt="Uploaded"
                    className="w-full rounded-xl border border-gray-200"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <button
                  onClick={() => setImage(null)}
                  className="w-full h-12 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Upload Different Image
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Number of Colors
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    value={colorCount}
                    onChange={(e) => setColorCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>4</span>
                    <span className="font-medium text-gray-600">{colorCount} colors</span>
                    <span>16</span>
                  </div>
                </div>

                <button
                  onClick={extractColors}
                  disabled={isProcessing}
                  className="w-full h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-amber-700 transition-colors font-medium disabled:opacity-50"
                >
                  <Palette className="h-5 w-5" />
                  {isProcessing ? "Extracting..." : "Extract Colors"}
                </button>
              </div>
            </div>
          )}
        </div>

        {extractedColors.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Extracted Palette</h3>
              <button
                onClick={downloadPalette}
                className="h-10 px-4 bg-gray-100 text-gray-600 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition-colors font-medium"
              >
                <Download className="h-4 w-4" /> Export
              </button>
            </div>

            <div className="flex h-24 rounded-xl overflow-hidden mb-6">
              {extractedColors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1 transition-all hover:flex-[1.5]"
                  style={{ backgroundColor: color.hex }}
                  title={`${color.hex} - ${color.percentage}%`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {extractedColors.map((color, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div
                    className="h-16 rounded-lg shadow-inner border border-gray-100 flex items-center justify-center mb-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="font-bold text-sm"
                      style={{ color: getContrastColor(color.hex) }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Usage</span>
                    <span className="text-xs font-medium text-gray-700">{color.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${color.percentage}%`, backgroundColor: color.hex }}
                    />
                  </div>
                  <div className="flex gap-1 mt-3">
                    <button
                      onClick={() => copyToClipboard(color.hex, index)}
                      className="flex-1 h-8 bg-white border border-gray-200 rounded-lg text-xs font-mono text-gray-600 hover:border-amber-500 hover:text-amber-600 transition-colors"
                    >
                      {copiedIndex === index ? <Check className="h-4 w-4 mx-auto text-emerald-500" /> : "Copy"}
                    </button>
                    <button
                      onClick={() => copyToClipboard(color.rgb, index + 100)}
                      className="flex-1 h-8 bg-white border border-gray-200 rounded-lg text-xs font-mono text-gray-600 hover:border-amber-500 hover:text-amber-600 transition-colors"
                    >
                      RGB
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {extractedColors.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">CSS Variables</h3>
            <div className="relative">
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl text-sm font-mono overflow-x-auto">
                {`:root {
${extractedColors.map((c, i) => `  --color-${i + 1}: ${c.hex}; /* ${c.percentage}% */`).join("\n")}
}`}
              </pre>
              <button
                onClick={() => copyToClipboard(extractedColors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join("\n"), 200)}
                className="absolute top-2 right-2 h-8 w-8 bg-white/10 text-white rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <div className="bg-amber-50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Palette className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800 space-y-2">
              <p className="font-semibold">How It Works</p>
              <p>• The tool analyzes pixel data from your image to find the most dominant colors</p>
              <p>• Colors are quantized to group similar shades together</p>
              <p>• The percentage shows how much each color appears in the image</p>
              <p>• Works best with images that have clear, distinct colors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
