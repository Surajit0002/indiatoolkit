"use client";

import { useState } from "react";
import { Search, Copy, Check, Tag } from "lucide-react";

// Comprehensive color names database
const colorNamesData = [
  { hex: "#000000", name: "Black" },
  { hex: "#FFFFFF", name: "White" },
  { hex: "#FF0000", name: "Red" },
  { hex: "#00FF00", name: "Lime" },
  { hex: "#0000FF", name: "Blue" },
  { hex: "#FFFF00", name: "Yellow" },
  { hex: "#00FFFF", name: "Cyan" },
  { hex: "#FF00FF", name: "Magenta" },
  { hex: "#C0C0C0", name: "Silver" },
  { hex: "#808080", name: "Gray" },
  { hex: "#800000", name: "Maroon" },
  { hex: "#808000", name: "Olive" },
  { hex: "#008000", name: "Green" },
  { hex: "#800080", name: "Purple" },
  { hex: "#008080", name: "Teal" },
  { hex: "#000080", name: "Navy" },
  { hex: "#FFA500", name: "Orange" },
  { hex: "#A52A2A", name: "Brown" },
  { hex: "#FFC0CB", name: "Pink" },
  { hex: "#FFD700", name: "Gold" },
  { hex: "#DC143C", name: "Crimson" },
  { hex: "#FF4500", name: "OrangeRed" },
  { hex: "#FF6347", name: "Tomato" },
  { hex: "#FF7F50", name: "Coral" },
  { hex: "#FF69B4", name: "HotPink" },
  { hex: "#DB7093", name: "PaleVioletRed" },
  { hex: "#E6E6FA", name: "Lavender" },
  { hex: "#FFFAF0", name: "FloralWhite" },
  { hex: "#F0E68C", name: "Khaki" },
  { hex: "#BDB76B", name: "DarkKhaki" },
  { hex: "#DAA520", name: "GoldenRod" },
  { hex: "#B8860B", name: "DarkGoldenRod" },
  { hex: "#CD853F", name: "Peru" },
  { hex: "#D2691E", name: "Chocolate" },
  { hex: "#8B4513", name: "SaddleBrown" },
  { hex: "#A0522D", name: "Sienna" },
  { hex: "#BC8F8F", name: "RosyBrown" },
  { hex: "#F4A460", name: "SandyBrown" },
  { hex: "#DEB887", name: "BurlyWood" },
  { hex: "#D2B48C", name: "Tan" },
  { hex: "#C19A6B", name: "Camel" },
  { hex: "#E9967A", name: "DarkSalmon" },
  { hex: "#FA8072", name: "Salmon" },
  { hex: "#F08080", name: "LightCoral" },
  { hex: "#CD5C5C", name: "IndianRed" },
  { hex: "#B22222", name: "FireBrick" },
  { hex: "#8B0000", name: "DarkRed" },
  { hex: "#006400", name: "DarkGreen" },
  { hex: "#228B22", name: "ForestGreen" },
  { hex: "#32CD32", name: "LimeGreen" },
  { hex: "#90EE90", name: "LightGreen" },
  { hex: "#98FB98", name: "PaleGreen" },
  { hex: "#7CFC00", name: "LawnGreen" },
  { hex: "#7FFF00", name: "Chartreuse" },
  { hex: "#00FF7F", name: "SpringGreen" },
  { hex: "#00FA9A", name: "MediumSpringGreen" },
  { hex: "#3CB371", name: "MediumSeaGreen" },
  { hex: "#2E8B57", name: "SeaGreen" },
  { hex: "#8FBC8F", name: "DarkSeaGreen" },
  { hex: "#20B2AA", name: "LightSeaGreen" },
  { hex: "#008B8B", name: "DarkCyan" },
  { hex: "#00CED1", name: "DarkTurquoise" },
  { hex: "#40E0D0", name: "Turquoise" },
  { hex: "#48D1CC", name: "MediumTurquoise" },
  { hex: "#E0FFFF", name: "LightCyan" },
  { hex: "#AFEEEE", name: "PaleTurquoise" },
  { hex: "#7FFFD4", name: "Aquamarine" },
  { hex: "#5F9EA0", name: "CadetBlue" },
  { hex: "#4682B4", name: "SteelBlue" },
  { hex: "#B0C4DE", name: "LightSteelBlue" },
  { hex: "#87CEEB", name: "SkyBlue" },
  { hex: "#87CEFA", name: "LightSkyBlue" },
  { hex: "#00BFFF", name: "DeepSkyBlue" },
  { hex: "#1E90FF", name: "DodgerBlue" },
  { hex: "#6495ED", name: "CornflowerBlue" },
  { hex: "#4169E1", name: "RoyalBlue" },
  { hex: "#0000CD", name: "MediumBlue" },
  { hex: "#00008B", name: "DarkBlue" },
  { hex: "#483D8B", name: "DarkSlateBlue" },
  { hex: "#6A5ACD", name: "SlateBlue" },
  { hex: "#7B68EE", name: "MediumSlateBlue" },
  { hex: "#9370DB", name: "MediumPurple" },
  { hex: "#DDA0DD", name: "Plum" },
  { hex: "#D8BFD8", name: "Thistle" },
  { hex: "#FFB6C1", name: "LightPink" },
  { hex: "#FF1493", name: "DeepPink" },
  { hex: "#C71585", name: "MediumVioletRed" },
  { hex: "#F0F8FF", name: "AliceBlue" },
  { hex: "#FAEBD7", name: "AntiqueWhite" },
  { hex: "#F5F5DC", name: "Beige" },
  { hex: "#FFE4C4", name: "Bisque" },
  { hex: "#FFEBCD", name: "BlanchedAlmond" },
  { hex: "#F5DEB3", name: "Wheat" },
  { hex: "#FFF8DC", name: "Cornsilk" },
  { hex: "#FFFACD", name: "LemonChiffon" },
  { hex: "#FFF5EE", name: "Seashell" },
  { hex: "#F0FFF0", name: "Honeydew" },
  { hex: "#F0FFFF", name: "Azure" },
  { hex: "#F5F5F5", name: "WhiteSmoke" },
  { hex: "#FFFAFA", name: "Snow" },
  { hex: "#9ACD32", name: "YellowGreen" },
  { hex: "#6B8E23", name: "OliveDrab" },
  { hex: "#556B2F", name: "DarkOliveGreen" },
  { hex: "#708090", name: "SlateGray" },
  { hex: "#778899", name: "LightSlateGray" },
  { hex: "#696969", name: "DimGray" },
  { hex: "#A9A9A9", name: "DarkGray" },
  { hex: "#D3D3D3", name: "LightGray" },
  { hex: "#DCDCDC", name: "Gainsboro" },
  { hex: "#1C1C1C", name: "VeryDarkGray" },
  { hex: "#363636", name: "DarkCharcoal" },
  { hex: "#4A4A4A", name: "Charcoal" },
  { hex: "#F8F8FF", name: "GhostWhite" },
  { hex: "#EE82EE", name: "Violet" },
  { hex: "#DA70D6", name: "Orchid" },
  { hex: "#BA55D3", name: "MediumOrchid" },
  { hex: "#9932CC", name: "DarkOrchid" },
  { hex: "#8A2BE2", name: "BlueViolet" },
  { hex: "#9400D3", name: "DarkViolet" },
  { hex: "#8B008B", name: "DarkMagenta" },
  { hex: "#4B0082", name: "Indigo" },
  { hex: "#A020F0", name: "Purple" },
];

interface ColorMatch {
  hex: string;
  name: string;
  distance: number;
}

export default function ColorNameFinder() {
  const [inputColor, setInputColor] = useState("#6366f1");
  const [matches, setMatches] = useState<ColorMatch[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const colorDistance = (hex1: string, hex2: string): number => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return Infinity;
    
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
  };

  const findClosestColors = (hex: string) => {
    const colorEntries = colorNamesData.map(({ hex: colorHex, name }) => ({
      hex: colorHex,
      name,
      distance: colorDistance(hex, colorHex)
    }));

    const sorted = colorEntries.sort((a, b) => a.distance - b.distance);
    setMatches(sorted.slice(0, 10));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const getContrastColor = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000000";
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Tag className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Color Name Finder</h2>
          </div>
          <p className="text-gray-500">Find the closest color name for any hex color</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Color</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-3 flex-1">
              <input
                type="color"
                value={inputColor}
                onChange={(e) => {
                  setInputColor(e.target.value);
                  findClosestColors(e.target.value);
                }}
                className="h-14 w-14 rounded-xl cursor-pointer border-2 border-gray-200"
              />
              <input
                type="text"
                value={inputColor}
                onChange={(e) => {
                  setInputColor(e.target.value);
                  findClosestColors(e.target.value);
                }}
                className="flex-1 h-14 px-4 bg-gray-50 border border-gray-100 rounded-xl font-mono text-sm uppercase"
                placeholder="#000000"
              />
            </div>
            <button
              onClick={() => findClosestColors(inputColor)}
              className="h-14 px-8 bg-indigo-600 text-white rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-colors font-medium"
            >
              <Search className="h-5 w-5" />
              Find
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Preview</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-32 h-32 rounded-2xl shadow-inner border-4 border-gray-100 flex items-center justify-center"
              style={{ backgroundColor: inputColor }}
            >
              <span
                className="font-bold text-lg drop-shadow-md"
                style={{ color: getContrastColor(inputColor) }}
              >
                {inputColor}
              </span>
            </div>
            <div className="flex-1 space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Your Input</p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-900 uppercase">{inputColor}</span>
                  <button
                    onClick={() => copyToClipboard(inputColor)}
                    className="h-10 w-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
                  >
                    {copied === inputColor ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {matches[0] && (
                <div className="p-4 bg-indigo-50 rounded-xl border-2 border-indigo-200">
                  <p className="text-sm text-indigo-600 mb-1">Closest Match</p>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl shadow-inner border border-indigo-200"
                      style={{ backgroundColor: matches[0].hex }}
                    />
                    <div>
                      <span className="text-xl font-bold text-gray-900">{matches[0].name}</span>
                      <p className="text-sm text-gray-500 font-mono uppercase">{matches[0].hex}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Matches</h3>
          <div className="space-y-3">
            {matches.map((match, index) => (
              <div
                key={match.hex}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  index === 0 ? "bg-indigo-50 border-2 border-indigo-200" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-xl shadow-inner border border-gray-200 shrink-0"
                  style={{ backgroundColor: match.hex }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{match.name}</span>
                    {index === 0 && (
                      <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-medium rounded-full">
                        Closest
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 font-mono uppercase">{match.hex}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Distance</p>
                  <p className="text-sm font-medium text-gray-600">{Math.round(match.distance)}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(match.hex)}
                  className="h-10 w-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
                >
                  {copied === match.hex ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Tag className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800 space-y-2">
              <p className="font-semibold">How It Works</p>
              <p>• Uses Euclidean distance in RGB color space to find the closest named color</p>
              <p>• Lower distance = closer match to the original color</p>
              <p>• Includes {colorNamesData.length} named colors from various color systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
