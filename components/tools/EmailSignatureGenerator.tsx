"use client";

import { useState } from "react";
import { Copy, Download, Mail, User, Building, Phone, Globe, MapPin, Link, Check } from "lucide-react";

export default function EmailSignatureGenerator() {
  const [fullName, setFullName] = useState("John Doe");
  const [jobTitle, setJobTitle] = useState("Marketing Manager");
  const [company, setCompany] = useState("Your Company");
  const [email, setEmail] = useState("john@company.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [website, setWebsite] = useState("www.company.com");
  const [address, setAddress] = useState("123 Business Ave, Suite 100, City, State 12345");
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#1E40AF");
  const [layout, setLayout] = useState<"horizontal" | "vertical" | "compact">("horizontal");
  const [copied, setCopied] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const copyToClipboard = () => {
    const signature = `${fullName}\n${jobTitle} | ${company}\n\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website}\nAddress: ${address}`;
    navigator.clipboard.writeText(signature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyHtml = () => {
    const html = `
<table style="font-family: Arial, sans-serif; max-width: 500px;">
  <tr>
    <td style="border-left: 4px solid ${primaryColor}; padding-left: 15px;">
      <p style="margin: 0; font-size: 18px; font-weight: bold; color: ${secondaryColor};">${fullName}</p>
      <p style="margin: 5px 0; font-size: 14px; color: #666;">${jobTitle} | ${company}</p>
      <p style="margin: 10px 0 5px; font-size: 13px;"><a href="mailto:${email}" style="color: ${primaryColor};">${email}</a></p>
      <p style="margin: 5px 0; font-size: 13px;">${phone}</p>
      <p style="margin: 5px 0; font-size: 13px;"><a href="https://${website}" style="color: ${primaryColor};">${website}</a></p>
      <p style="margin: 5px 0; font-size: 13px; color: #666;">${address}</p>
    </td>
  </tr>
</table>`;
    navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Email Signature Generator</h2>
          <p className="text-slate-500 font-bold text-sm mt-2">
            Design professional email signatures
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-500" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Building className="h-5 w-5 text-blue-500" />
                Company Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-500" />
                Additional Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn URL</label>
                  <input
                    type="text"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    placeholder="linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Twitter Handle</label>
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="@yourhandle"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-blue-500" />
                Styling
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Color</label>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary Color</label>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Layout</label>
                  <select
                    value={layout}
                    onChange={(e) => setLayout(e.target.value as "horizontal" | "vertical" | "compact")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium"
                  >
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                Preview
              </h3>
              
              <div className="bg-slate-50 rounded-xl p-4 min-h-[200px]">
                {layout === "horizontal" ? (
                  <div className="flex gap-4">
                    <div className="w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                    <div>
                      <p className="font-bold text-lg" style={{ color: secondaryColor }}>{fullName}</p>
                      <p className="text-sm text-slate-600">{jobTitle} | {company}</p>
                      <div className="mt-3 space-y-1 text-sm">
                        <p className="flex items-center gap-2 text-slate-600">
                          <Mail className="h-4 w-4 text-blue-500" />
                          <a href={`mailto:${email}`} style={{ color: primaryColor }}>{email}</a>
                        </p>
                        <p className="flex items-center gap-2 text-slate-600">
                          <Phone className="h-4 w-4 text-blue-500" />
                          {phone}
                        </p>
                        <p className="flex items-center gap-2 text-slate-600">
                          <Globe className="h-4 w-4 text-blue-500" />
                          <a href={`https://${website}`} style={{ color: primaryColor }}>{website}</a>
                        </p>
                        <p className="flex items-center gap-2 text-slate-600">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          {address}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : layout === "vertical" ? (
                  <div className="text-center">
                    <p className="font-bold text-lg" style={{ color: secondaryColor }}>{fullName}</p>
                    <p className="text-sm text-slate-600 mb-3">{jobTitle} | {company}</p>
                    <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 mb-3" />
                    <div className="space-y-2 text-sm">
                      <p><a href={`mailto:${email}`} style={{ color: primaryColor }}>{email}</a></p>
                      <p>{phone}</p>
                      <p><a href={`https://${website}`} style={{ color: primaryColor }}>{website}</a></p>
                      <p className="text-slate-500">{address}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-base" style={{ color: secondaryColor }}>{fullName}</p>
                      <p className="text-xs text-slate-600">{jobTitle}</p>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                      <p>{company}</p>
                      <p>{email}</p>
                      <p>{phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Copy className="h-5 w-5 text-blue-500" />
                Export
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? "Copied!" : "Copy Text"}
                </button>
                <button
                  onClick={copyHtml}
                  className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                >
                  {copiedHtml ? <Check className="h-5 w-5" /> : <Link className="h-5 w-5" />}
                  {copiedHtml ? "Copied!" : "Copy HTML"}
                </button>
                <button
                  className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
