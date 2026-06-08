"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Key, Settings, Sliders, Check, Copy, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  
  // States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [ocrEngine, setOcrEngine] = useState("advanced");
  const [vectorSearch, setVectorSearch] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setFullName(user.user_metadata?.full_name || "Nakulan");
    } else {
      setFullName("Nakulan");
      setEmail("nakulan@example.com");
    }

    const savedKey = localStorage.getItem("atlas_mock_api_key");
    if (savedKey) setApiKey(savedKey);

    const savedOcr = localStorage.getItem("atlas_settings_ocr");
    if (savedOcr) setOcrEngine(savedOcr);

    const savedVector = localStorage.getItem("atlas_settings_vector");
    if (savedVector !== null) setVectorSearch(savedVector === "true");
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setSaveSuccess(false);

    // Simulate saving changes
    setTimeout(() => {
      setIsUpdating(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleGenerateKey = () => {
    const randomHex = Array.from({ length: 32 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    const newKey = `at_live_${randomHex}`;
    setApiKey(newKey);
    localStorage.setItem("atlas_mock_api_key", newKey);
  };

  const handleCopyKey = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleVector = () => {
    const nextVal = !vectorSearch;
    setVectorSearch(nextVal);
    localStorage.setItem("atlas_settings_vector", String(nextVal));
  };

  const handleOcrChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextVal = e.target.value;
    setOcrEngine(nextVal);
    localStorage.setItem("atlas_settings_ocr", nextVal);
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto text-slate-900 animate-fadeIn">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences, processing configurations, and API credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column: Profile & Parameters */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              Account Settings
            </h2>
            <p className="text-xs text-gray-500 mb-6">Manage the name and email address connected to your account.</p>

            {saveSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium animate-fadeIn">
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm bg-slate-50 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm bg-slate-50 font-medium"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-xl transition cursor-pointer text-sm shadow disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

          {/* Processing Configurations Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Sliders size={18} className="text-blue-600" />
              Document Processing Engine
            </h2>
            <p className="text-xs text-gray-500 mb-6">Fine-tune the configurations used to process and chunk incoming PDFs.</p>

            <div className="space-y-5">
              {/* Select Option */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">OCR Analysis Mode</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Control the parsing depth and OCR accuracy levels for PDF pages.</p>
                </div>
                <select
                  value={ocrEngine}
                  onChange={handleOcrChange}
                  className="p-2.5 border rounded-xl bg-slate-50 text-sm font-medium outline-none border-slate-200 focus:border-blue-500 min-w-[150px]"
                >
                  <option value="basic">Standard Parser</option>
                  <option value="advanced">Advanced Layout OCR</option>
                  <option value="multilingual">Multilingual OCR</option>
                </select>
              </div>

              {/* Toggle Option */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">Dense Vector Search</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Generate high-dimensional embeddings for advanced semantic text matching.</p>
                </div>
                <button
                  onClick={handleToggleVector}
                  className="text-blue-600 focus:outline-none transition cursor-pointer"
                >
                  {vectorSearch ? (
                    <ToggleRight size={44} className="text-blue-600" />
                  ) : (
                    <ToggleLeft size={44} className="text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: API Keys & Credentials */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Key size={18} className="text-blue-600" />
                API Credentials
              </h2>
              <p className="text-xs text-gray-500 mb-6">Generate secret keys to programmatically query your document base.</p>

              {apiKey ? (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Your Secret Key</label>
                  <div className="flex items-center gap-2 bg-slate-50 border rounded-xl p-2.5 pr-2 select-all">
                    <span className="text-xs font-mono text-slate-700 truncate flex-1">
                      {apiKey}
                    </span>
                    <button
                      onClick={handleCopyKey}
                      className="p-2 text-slate-500 hover:text-blue-600 transition hover:bg-slate-100 rounded-lg cursor-pointer"
                      title="Copy Key"
                    >
                      {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Keep this key secure. Programmatic integrations can access OCR pipelines.
                  </p>
                </div>
              ) : (
                <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-gray-400">
                  <Key size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No active API keys found</p>
                </div>
              )}
            </div>

            <button
              onClick={handleGenerateKey}
              className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition text-sm flex gap-2 items-center justify-center cursor-pointer shadow-lg shadow-blue-500/10"
            >
              <Sparkles size={16} />
              {apiKey ? "Roll Secret Key" : "Generate API Key"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
