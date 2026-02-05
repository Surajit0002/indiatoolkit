"use client";

import { useState } from "react";
import { Code, Copy, RefreshCw, Download, CheckCircle, FileCode } from "lucide-react";

interface SchemaData {
  schemaType: string;
  name: string;
  description: string;
  url: string;
  image: string;
  author: string;
  datePublished: string;
  organization: string;
}

const schemaTypes = [
  { value: "Article", label: "Article", icon: "📰" },
  { value: "BlogPosting", label: "Blog Post", icon: "📝" },
  { value: "Product", label: "Product", icon: "🛒" },
  { value: "FAQPage", label: "FAQ", icon: "❓" },
  { value: "HowTo", label: "How-To", icon: "📚" },
  { value: "Organization", label: "Organization", icon: "🏢" },
  { value: "LocalBusiness", label: "Local Business", icon: "📍" },
  { value: "Event", label: "Event", icon: "🎉" },
  { value: "Recipe", label: "Recipe", icon: "🍳" },
  { value: "Course", label: "Course", icon: "🎓" }
];

export default function SchemaMarkupGenerator() {
  const [data, setData] = useState<SchemaData>({
    schemaType: "Article",
    name: "",
    description: "",
    url: "",
    image: "",
    author: "",
    datePublished: new Date().toISOString().split("T")[0],
    organization: ""
  });

  const [schema, setSchema] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof SchemaData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const generateSchema = async () => {
    setIsGenerating(true);

    setTimeout(() => {
      let schemaObject: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": data.schemaType
      };

      switch (data.schemaType) {
        case "Article":
        case "BlogPosting":
          schemaObject = {
            ...schemaObject,
            "headline": data.name,
            "description": data.description,
            "image": data.image,
            "author": {
              "@type": "Person",
              "name": data.author
            },
            "publisher": {
              "@type": "Organization",
              "name": data.organization,
              "logo": {
                "@type": "ImageObject",
                "url": data.image
              }
            },
            "datePublished": data.datePublished,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": data.url
            }
          };
          break;

        case "Product":
          schemaObject = {
            ...schemaObject,
            "name": data.name,
            "description": data.description,
            "image": data.image,
            "brand": {
              "@type": "Brand",
              "name": data.organization
            },
            "offers": {
              "@type": "Offer",
              "url": data.url,
              "priceCurrency": "INR",
              "price": "0",
              "availability": "https://schema.org/InStock"
            }
          };
          break;

        case "FAQPage":
          schemaObject = {
            ...schemaObject,
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is " + data.name + "?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": data.description
                }
              }
            ]
          };
          break;

        case "HowTo":
          schemaObject = {
            ...schemaObject,
            "name": data.name,
            "description": data.description,
            "image": data.image,
            "author": {
              "@type": "Person",
              "name": data.author
            },
            "datePublished": data.datePublished,
            "step": [
              {
                "@type": "HowToStep",
                "name": "Step 1",
                "text": "Get started with " + data.name,
                "url": data.url + "#step1"
              },
              {
                "@type": "HowToStep",
                "name": "Step 2",
                "text": "Follow the instructions carefully",
                "url": data.url + "#step2"
              }
            ]
          };
          break;

        case "Organization":
          schemaObject = {
            ...schemaObject,
            "name": data.organization,
            "url": data.url,
            "logo": data.image,
            "description": data.description
          };
          break;

        case "LocalBusiness":
          schemaObject = {
            ...schemaObject,
            "name": data.name,
            "image": data.image,
            "description": data.description,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "India"
            },
            "url": data.url
          };
          break;

        case "Event":
          schemaObject = {
            ...schemaObject,
            "name": data.name,
            "startDate": data.datePublished,
            "location": {
              "@type": "Place",
              "name": data.organization
            },
            "description": data.description
          };
          break;

        case "Recipe":
          schemaObject = {
            ...schemaObject,
            "name": data.name,
            "image": data.image,
            "author": {
              "@type": "Person",
              "name": data.author
            },
            "datePublished": data.datePublished,
            "description": data.description
          };
          break;

        case "Course":
          schemaObject = {
            ...schemaObject,
            "name": data.name,
            "description": data.description,
            "provider": {
              "@type": "Organization",
              "name": data.organization
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online"
            }
          };
          break;

        default:
          schemaObject = {
            ...schemaObject,
            "name": data.name,
            "description": data.description,
            "url": data.url,
            "image": data.image
          };
      }

      setSchema(JSON.stringify(schemaObject, null, 2));
      setIsGenerating(false);
    }, 1000);
  };

  const copySchema = () => {
    if (!schema) return;
    navigator.clipboard.writeText(schema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSchema = () => {
    if (!schema) return;
    const blob = new Blob([schema], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.schemaType.toLowerCase()}-schema.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setData({
      schemaType: "Article",
      name: "",
      description: "",
      url: "",
      image: "",
      author: "",
      datePublished: new Date().toISOString().split("T")[0],
      organization: ""
    });
    setSchema(null);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Schema Markup Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Generate SEO-friendly JSON-LD schema markup
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Schema Type */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Schema Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {schemaTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateField("schemaType", type.value)}
                    className={`p-3 rounded-xl text-sm font-bold transition-all ${
                      data.schemaType === type.value
                        ? "bg-green-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <span className="block text-lg mb-1">{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  {data.schemaType === "Organization" || data.schemaType === "LocalBusiness" ? "Business/Location Name" : "Title/Name"}
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={data.schemaType === "Organization" ? "Your Company Name" : "Page/Product Name"}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  URL
                </label>
                <input
                  type="url"
                  value={data.url}
                  onChange={(e) => updateField("url", e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Description
              </label>
              <textarea
                value={data.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Brief description of the content"
                rows={3}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium resize-none"
              />
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Image URL
                </label>
                <input
                  type="url"
                  value={data.image}
                  onChange={(e) => updateField("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Organization/Publisher
                </label>
                <input
                  type="text"
                  value={data.organization}
                  onChange={(e) => updateField("organization", e.target.value)}
                  placeholder="Company or Publisher name"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Author & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Author Name
                </label>
                <input
                  type="text"
                  value={data.author}
                  onChange={(e) => updateField("author", e.target.value)}
                  placeholder="Author or Creator name"
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Published Date
                </label>
                <input
                  type="date"
                  value={data.datePublished}
                  onChange={(e) => updateField("datePublished", e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-green-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={generateSchema}
                disabled={isGenerating}
                className="flex-1 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileCode className="h-5 w-5" />
                    Generate Schema
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="px-6 h-14 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results */}
          {schema && (
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-t border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-green-800 uppercase text-sm">
                  Generated JSON-LD Schema
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copySchema}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 text-green-700 rounded-xl text-sm font-bold hover:bg-green-50 transition-all"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadSchema}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {schema}
                </pre>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">How to Use</p>
                <ol className="text-sm text-blue-600 space-y-1 list-decimal list-inside">
                  <li>Copy the schema code above</li>
                  <li>Paste it into the <span className="font-mono bg-slate-100 px-1 rounded">&lt;head&gt;</span> section of your HTML page</li>
                  <li>Test with <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="underline">Google Rich Results Test</a></li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
            <Code className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-bold text-green-800 mb-2">Better Rankings</h3>
            <p className="text-sm text-green-700">
              Schema markup helps search engines understand your content better.
            </p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <FileCode className="h-8 w-8 text-emerald-600 mb-3" />
            <h3 className="font-bold text-emerald-800 mb-2">Rich Snippets</h3>
            <p className="text-sm text-emerald-700">
              Schema can earn you rich snippets in search results.
            </p>
          </div>
          <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
            <CheckCircle className="h-8 w-8 text-teal-600 mb-3" />
            <h3 className="font-bold text-teal-800 mb-2">Easy Integration</h3>
            <p className="text-sm text-teal-700">
              Simply copy and paste the generated code into your website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
