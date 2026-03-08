"use client";

import { useState } from "react";
import { Package, Sparkles, Copy, RefreshCw, Download, Tag, Zap, Star } from "lucide-react";

interface ProductData {
  productName: string;
  category: string;
  features: string;
  benefits: string;
  tone: string;
  platform: string;
  keywords: string;
}

const categories = [
  "Electronics",
  "Fashion & Apparel",
  "Home & Garden",
  "Beauty & Cosmetics",
  "Health & Wellness",
  "Sports & Outdoors",
  "Books & Media",
  "Food & Beverages",
  "Toys & Games",
  "Services",
  "Software & Apps",
  "Other"
];

const tones = ["Professional", "Casual", "Luxury", "Playful", "Persuasive", "Friendly", "Technical"];

const platforms = [
  "E-commerce Website",
  "Amazon/Online Marketplace",
  "Social Media",
  "Print Catalog",
  "Email Marketing",
  "Landing Page",
  "General Use"
];

export default function AiProductDescriptionGenerator() {
  const [product, setProduct] = useState<ProductData>({
    productName: "",
    category: "Electronics",
    features: "",
    benefits: "",
    tone: "Professional",
    platform: "E-commerce Website",
    keywords: ""
  });

  const [generatedDescriptions, setGeneratedDescriptions] = useState<string[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = (field: keyof ProductData, value: string) => {
    setProduct({ ...product, [field]: value });
    setApiError(null);
  };

  const generateDescriptions = async () => {
    if (!product.productName.trim()) return;

    setIsGenerating(true);
    setApiError(null);

    try {
      const systemPrompt = `You are an expert product copywriter. Write compelling, SEO-friendly product descriptions that drive sales.

Guidelines:
- Highlight key features and benefits
- Use persuasive language
- Include relevant keywords naturally
- Keep descriptions concise but impactful
- Focus on customer benefits
- Use power words and action verbs
- Write in the specified tone`;

      const prompt = `Write 3 different product descriptions for:

Product Name: ${product.productName}
Category: ${product.category}
Features: ${product.features || "Not specified"}
Benefits: ${product.benefits || "Not specified"}
Tone: ${product.tone}
Platform: ${product.platform}
Keywords: ${product.keywords || "None specified"}

Provide 3 variations:
1. Short version (50-75 words) - Concise for listings
2. Medium version (100-150 words) - Standard product page
3. Long version (200-300 words) - Detailed description

Format each with a catchy headline.`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          systemPrompt,
          toolId: "ai-product-description-generator"
        })
      });

      const data = await response.json();

      if (data.error) {
        setApiError(data.error);
        setGeneratedDescriptions(getFallbackDescriptions());
      } else {
        // Split the response into 3 descriptions
        const descriptions = data.text.split(/(?=\n\d+\.|\n---)/).filter((d: string) => d.trim());
        setGeneratedDescriptions(descriptions.length >= 3 ? descriptions.slice(0, 3) : [data.text]);
      }
    } catch (error) {
      console.error("Error generating descriptions:", error);
      setApiError("Failed to generate descriptions. Please try again.");
      setGeneratedDescriptions(getFallbackDescriptions());
    } finally {
      setIsGenerating(false);
    }
  };

  const getFallbackDescriptions = (): string[] => {
    return [
      `**Short Description**

${product.productName} - ${product.features.split(',')[0] || 'Premium quality'} at an unbeatable price. Perfect for ${product.category.toLowerCase()} enthusiasts.

**Medium Description**

Introducing ${product.productName}, the ultimate solution for your ${product.category.toLowerCase()} needs. Crafted with precision and designed for excellence, this product delivers exceptional performance you can rely on.

${product.benefits ? `Key Benefits:\n${product.benefits}` : 'Experience unmatched quality and value with every use.'}

**Long Description**

${product.productName} represents the pinnacle of innovation in the ${product.category} industry. Meticulously engineered to exceed expectations, this product combines cutting-edge technology with elegant design.

${product.features ? `Outstanding Features:\n${product.features}` : 'Built with premium materials for durability and long-lasting performance.'}

${product.benefits ? `Why Choose ${product.productName}:\n${product.benefits}` : 'Elevate your experience with our commitment to quality and customer satisfaction.'}`
    ];
  };

  const copyDescriptions = (index?: number) => {
    if (!generatedDescriptions) return;
    
    const text = index !== undefined 
      ? generatedDescriptions[index] 
      : generatedDescriptions.join('\n\n---\n\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadDescriptions = () => {
    if (!generatedDescriptions) return;
    const text = generatedDescriptions.join('\n\n---\n\n');
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${product.productName.toLowerCase().replace(/\s+/g, "-")}-descriptions.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setProduct({
      productName: "",
      category: "Electronics",
      features: "",
      benefits: "",
      tone: "Professional",
      platform: "E-commerce Website",
      keywords: ""
    });
    setGeneratedDescriptions(null);
    setApiError(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Product Description Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create compelling product descriptions that sell
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Product Name & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={product.productName}
                  onChange={(e) => updateField("productName", e.target.value)}
                  placeholder="e.g., Wireless Bluetooth Headphones"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Category
                </label>
                <select
                  value={product.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tone & Platform */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Tone
                </label>
                <select
                  value={product.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Platform
                </label>
                <select
                  value={product.platform}
                  onChange={(e) => updateField("platform", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Key Features (Optional)
              </label>
              <textarea
                value={product.features}
                onChange={(e) => updateField("features", e.target.value)}
                placeholder="e.g., 20-hour battery life, noise cancellation, premium sound quality, wireless charging"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium min-h-[80px] resize-none"
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Benefits (Optional)
              </label>
              <textarea
                value={product.benefits}
                onChange={(e) => updateField("benefits", e.target.value)}
                placeholder="e.g., Enjoy music without interruptions, comfortable for all-day wear, easy to connect"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium min-h-[80px] resize-none"
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Keywords to Include (Optional)
              </label>
              <input
                type="text"
                value={product.keywords}
                onChange={(e) => updateField("keywords", e.target.value)}
                placeholder="e.g., wireless, premium, best seller (comma separated)"
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-medium"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateDescriptions}
              disabled={isGenerating || !product.productName.trim()}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Generating Descriptions...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate with AI
                </>
              )}
            </button>

            {apiError && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-sm">
                {apiError}. Using fallback response.
              </div>
            )}
          </div>
        </div>

        {/* Generated Output */}
        {generatedDescriptions && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Tag className="h-5 w-5 text-amber-500" />
                Generated Descriptions ({generatedDescriptions.length})
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => copyDescriptions()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy All"}
                </button>
                <button
                  onClick={downloadDescriptions}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>

            {generatedDescriptions.map((desc, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-amber-600 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Variation {index + 1}
                    </span>
                    <button
                      onClick={() => copyDescriptions(index)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 whitespace-pre-wrap text-sm">
                    {desc}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <button
                onClick={generateDescriptions}
                disabled={isGenerating}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
              >
                <Zap className="h-5 w-5" />
                Regenerate
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-100">
          <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Tips for High-Converting Descriptions
          </h4>
          <ul className="text-sm text-amber-800 space-y-2">
            <li>• Focus on benefits, not just features</li>
            <li>• Use power words like "exclusive," "premium," "guaranteed"</li>
            <li>• Include social proof when available</li>
            <li>• Add a clear call-to-action</li>
            <li>• Optimize for relevant search keywords</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
