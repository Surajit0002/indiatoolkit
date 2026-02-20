"use client";

import { useState } from "react";
import { Copy, FileText, Calendar, Check, Download } from "lucide-react";

export default function PressReleaseGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [boilerplate, setBoilerplate] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState("");

  const generatePressRelease = () => {
    if (!companyName || !headline || !keyPoints) {
      alert("Please fill in Company Name, Headline, and Key Points");
      return;
    }

    const release = `FOR IMMEDIATE RELEASE

${date}

${city ? `${city}, ` : ""}${date}

${headline}
${subheadline ? `— ${subheadline} —\n` : ""}

${keyPoints.split("\n").map(point => `• ${point}`).join("\n")}

About ${companyName}
${boilerplate || `${companyName} is a leading provider of innovative solutions. Founded in 2020, we are committed to delivering excellence and creating value for our customers.`}

Media Contact:
${contactName || "[Contact Name]"}
${contactEmail ? `<${contactEmail}>` : ""}
${companyName}

###

`;

    setOutput(release);
    setGenerated(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Press Release Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Create professional press releases
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-slate-600" />
                Release Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Main headline"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subheadline (Optional)</label>
                  <input
                    type="text"
                    value={subheadline}
                    onChange={(e) => setSubheadline(e.target.value)}
                    placeholder="Supporting tagline"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-slate-600" />
                Location & Date
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City, State"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-slate-600" />
                Content
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Key Points (one per line)
                  </label>
                  <textarea
                    value={keyPoints}
                    onChange={(e) => setKeyPoints(e.target.value)}
                    placeholder="• First key point&#10;• Second key point&#10;• Third key point"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Boilerplate (About Company)
                  </label>
                  <textarea
                    value={boilerplate}
                    onChange={(e) => setBoilerplate(e.target.value)}
                    placeholder="Brief description of your company..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-slate-600" />
                Media Contact
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Media contact name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="media@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={generatePressRelease}
              className="w-full py-4 bg-gradient-to-r from-slate-600 to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
            >
              Generate Press Release
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-600" />
                Preview
              </h3>
              
              <div className="bg-slate-50 rounded-xl p-4 min-h-[400px] overflow-auto">
                {generated ? (
                  <div className="font-mono text-xs whitespace-pre-wrap text-slate-700">
                    {output}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-slate-400 text-center">
                      Fill in the details and click<br />&quot;Generate Press Release&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>

            {generated && (
              <div className="space-y-3">
                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 bg-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied!" : "Copy Press Release"}
                </button>
                <button
                  className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download as Text
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
