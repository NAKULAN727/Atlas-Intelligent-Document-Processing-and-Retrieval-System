"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Please fill in all fields");
      return;
    }
    const res = await login(email, password);
    if (res?.error) {
      setErrorMsg(res.error.message || "Invalid email or password");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl h-[750px] bg-white rounded-3xl overflow-hidden shadow-2xl flex">
        {/* LEFT PANEL */}
        <div className="w-1/2 relative overflow-hidden">
          <Image
            src="/atlas-knowledge.png"
            alt="Atlas Knowledge Engine"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full p-12 text-white">
            <h1 className="text-7xl font-bold mb-4">Atlas</h1>
            <p className="text-xl text-slate-200 leading-relaxed max-w-md">
              Transform enterprise PDFs into structured, searchable knowledge using OCR, vector search, and AI-powered retrieval.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 flex items-center justify-center bg-white px-12">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-5xl font-bold text-slate-900 mb-3">Welcome Back</h2>
              <p className="text-slate-500 mb-8">Sign in to continue using Atlas</p>

              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium animate-fadeIn">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 mb-4 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 caret-blue-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  disabled={loading}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 mb-6 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 caret-blue-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  disabled={loading}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="flex justify-center mt-8">
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Create Account →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
