"use client";

import { useState } from "react";
import { Copy, Download, Palette, Type, Image as ImageIcon, FileText, Check } from "lucide-react";

export default function BrandStyleGuideGenerator() {
  const [brandName, setBrandName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#1E40AF");
  const [accentColor, setAccentColor] = useState("#F59E0B");
  const [textColor, setTextColor] = useState("#1F2937");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [fontHeading, setFontHeading] = useState("Inter");
  const [fontBody, setFontBody] = useState("Roboto");
  const [brandVoice, setBrandVoice] = useState("Professional");
  const [logoPlacement, setLogoPlacement] = useState("Left aligned");
  const [spacingUnit, setSpacingUnit] = useState(8);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const voiceOptions = [
    "Professional", "Friendly", "Bold", "Elegant", "Playful", "Innovative", "Trustworthy", "Luxurious"
  ];

  const generateStyleGuide = () => {
    setGenerated(true);
  };

  const copyToClipboard = () => {
    const styleGuide = `
# Brand Style Guide: ${brandName || "Your Brand"}

## Color Palette
- Primary: ${primaryColor}
- Secondary: ${secondaryColor}
- Accent: ${accentColor}
- Text: ${textColor}
- Background: ${backgroundColor}

## Typography
- Headings: ${fontHeading}
- Body: ${fontBody}

## Brand Voice
${brandVoice}

## Logo Usage
- Placement: ${logoPlacement}
- Clear space: ${spacingUnit * 4}px minimum

## Spacing System
- Base unit: ${spacingUnit}px
- Scale: ${spacingUnit}px grid system
    `.trim();
    navigator.clipboard.writeText(styleGuide);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Palette className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Brand Style Guide Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create comprehensive brand style guides
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-indigo-500" />
                Brand Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter your brand name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Voice</label>
                  <select
                    value={brandVoice}
                    onChange={(e) => setBrandVoice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium"
                  >
                    {voiceOptions.map((voice) => (
                      <option key={voice} value={voice}>{voice}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-indigo-500" />
                Color Palette
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Primary</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Accent</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Text</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Background</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Type className="h-5 w-5 text-indigo-500" />
                Typography
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Heading Font</label>
                  <select
                    value={fontHeading}
                    onChange={(e) => setFontHeading(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Oswald">Oswald</option>
                    <option value="Raleway">Raleway</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Body Font</label>
                  <select
                    value={fontBody}
                    onChange={(e) => setFontBody(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium"
                  >
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Inter">Inter</option>
                    <option value="Lato">Lato</option>
                    <option value="Source Sans Pro">Source Sans Pro</option>
                    <option value="PT Sans">PT Sans</option>
                    <option value="Merriweather">Merriweather</option>
                    <option value="Nunito">Nunito</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-indigo-500" />
                Logo & Spacing
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Logo Placement</label>
                  <select
                    value={logoPlacement}
                    onChange={(e) => setLogoPlacement(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium"
                  >
                    <option value="Left aligned">Left aligned</option>
                    <option value="Center aligned">Center aligned</option>
                    <option value="Right aligned">Right aligned</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Spacing Unit: {spacingUnit}px</label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    value={spacingUnit}
                    onChange={(e) => setSpacingUnit(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={generateStyleGuide}
              className="w-full py-4 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
            >
              Generate Style Guide
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" />
                Preview
              </h3>
              
              <div className="bg-slate-50 rounded-xl p-4 min-h-400px">
                {generated ? (
                  <div className="space-y-6">
                    {/* Color Palette Preview */}
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm mb-2">Color Palette</h4>
                      <div className="flex gap-2">
                        <div className="h-12 flex-1 rounded-lg shadow" style={{ backgroundColor: primaryColor }} title="Primary" />
                        <div className="h-12 flex-1 rounded-lg shadow" style={{ backgroundColor: secondaryColor }} title="Secondary" />
                        <div className="h-12 flex-1 rounded-lg shadow" style={{ backgroundColor: accentColor }} title="Accent" />
                        <div className="h-12 flex-1 rounded-lg shadow" style={{ backgroundColor: textColor }} title="Text" />
                        <div className="h-12 flex-1 rounded-lg shadow border" style={{ backgroundColor: backgroundColor }} title="Background" />
                      </div>
                    </div>

                    {/* Typography Preview */}
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm mb-2">Typography</h4>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold" style={{ fontFamily: fontHeading }}>Heading Text</p>
                        <p className="text-base" style={{ fontFamily: fontBody }}>Body text preview with the selected font combination.</p>
                      </div>
                    </div>

                    {/* Brand Voice */}
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm mb-2">Brand Voice</h4>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {brandVoice}
                      </span>
                    </div>

                    {/* Spacing System */}
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm mb-2">Spacing System</h4>
                      <div className="flex gap-2 items-end">
                        <div className="h-4 w-4 bg-indigo-500 rounded" />
                        <div className="h-6 w-6 bg-indigo-500 rounded" />
                        <div className="h-8 w-8 bg-indigo-500 rounded" />
                        <div className="h-10 w-10 bg-indigo-500 rounded" />
                        <div className="h-12 w-12 bg-indigo-500 rounded" />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{spacingUnit}px base unit</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-400 text-center">
                      Fill in the details and click<br />&quot;Generate Style Guide&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>

            {generated && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Copy className="h-5 w-5 text-indigo-500" />
                  Export
                </h3>
                
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    {copied ? "Copied!" : "Copy Guide"}
                  </button>
                  <button
                    className="flex-1 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
