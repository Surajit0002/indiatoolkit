"use client";

import { useState } from "react";
import { Copy, Palette, Type, Tag, Download, Check } from "lucide-react";

export default function ProductLabelDesigner() {
  const [productName, setProductName] = useState("Organic Coffee");
  const [tagline, setTagline] = useState("Premium Quality");
  const [brandName, setBrandName] = useState("Your Brand");
  const [weight, setWeight] = useState("250g");
  const [ingredients, setIngredients] = useState("100% Arabica Beans");
  const [description, setDescription] = useState("Rich and smooth taste");
  const [secondaryColor, setSecondaryColor] = useState("#8B4513");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [labelShape, setLabelShape] = useState<"rectangle" | "circle" | "rounded">("rounded");
  const [copied, setCopied] = useState(false);

  const getShapeStyle = () => {
    switch (labelShape) {
      case "circle":
        return "rounded-full";
      case "rounded":
        return "rounded-2xl";
      default:
        return "rounded-none";
    }
  };

  const copyHtml = () => {
    const html = `<div style="width: 300px; padding: 20px; background: ${secondaryColor}; border-radius: ${labelShape === "rectangle" ? "0" : labelShape === "circle" ? "50%" : "20px"}; text-align: center; font-family: Arial, sans-serif;">
  <h2 style="color: ${textColor}; font-size: 24px; margin: 0;">${productName}</h2>
  <p style="color: ${textColor}; font-size: 14px; margin: 5px 0;">${tagline}</p>
  <hr style="border-color: ${textColor}; margin: 10px 0;">
  <p style="color: ${textColor}; font-size: 12px; margin: 5px 0;">${brandName}</p>
  <p style="color: ${textColor}; font-size: 16px; font-weight: bold; margin: 10px 0;">${weight}</p>
  <p style="color: ${textColor}; font-size: 11px; margin: 5px 0;">${ingredients}</p>
  <p style="color: ${textColor}; font-size: 10px; margin-top: 10px;">${description}</p>
</div>`;
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Tag className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Product Label Designer</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">Design product labels and packaging</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5 text-amber-500" />Product Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                  <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tagline</label>
                  <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Name</label>
                  <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Weight/Size</label>
                  <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all font-medium" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Type className="h-5 w-5 text-amber-500" />Label Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ingredients/Contents</label>
                  <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                    rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all font-medium" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-amber-500" />Styling
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Background</label>
                  <div className="flex gap-2">
                    <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer" />
                    <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Text</label>
                  <div className="flex gap-2">
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer" />
                    <input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Shape</label>
                  <select value={labelShape} onChange={(e) => setLabelShape(e.target.value as "rectangle" | "circle" | "rounded")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all font-medium">
                    <option value="rectangle">Rectangle</option>
                    <option value="rounded">Rounded</option>
                    <option value="circle">Circle</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-amber-500" />Label Preview
              </h3>
              <div className="bg-slate-100 rounded-xl p-8 flex items-center justify-center min-h-[300px]">
                <div className={`w-[280px] p-6 ${getShapeStyle()}`} style={{ backgroundColor: secondaryColor }}>
                  <h2 className="text-2xl font-bold text-center" style={{ color: textColor }}>{productName}</h2>
                  <p className="text-sm text-center mt-1" style={{ color: textColor }}>{tagline}</p>
                  <div className="h-0.5 my-3" style={{ backgroundColor: textColor }} />
                  <p className="text-center text-sm" style={{ color: textColor }}>{brandName}</p>
                  <p className="text-xl font-bold text-center mt-2" style={{ color: textColor }}>{weight}</p>
                  <p className="text-xs text-center mt-2" style={{ color: textColor }}>{ingredients}</p>
                  <p className="text-xs text-center mt-3" style={{ color: textColor }}>{description}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Copy className="h-5 w-5 text-amber-500" />Export
              </h3>
              <div className="space-y-3">
                <button onClick={copyHtml}
                  className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied!" : "Copy HTML"}
                </button>
                <button className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />Download Image
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-amber-500" />Label Specs
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Standard Sizes:</strong></p>
                <p>Small: 2" × 3"</p>
                <p>Medium: 3" × 4"</p>
                <p>Large: 4" × 6"</p>
                <p>Circle: 2.5" diameter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
