"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-8">

      <div className="w-full max-w-7xl h-[750px] bg-white rounded-3xl overflow-hidden shadow-2xl flex">

        {/* LEFT PANEL */}

<div className="w-1/2 relative overflow-hidden">

  {/* Background Image */}
  <Image
  src="/atlas-knowledge.png"
  alt="Atlas Knowledge Engine"
  fill
  priority
  sizes="50vw"
  className="object-cover"
/>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

  {/* Text */}
  <div className="relative z-10 flex flex-col justify-end h-full p-12 text-white">

    <h1 className="text-7xl font-bold mb-4">
      Atlas
    </h1>

    <p className="text-xl text-slate-200 leading-relaxed max-w-md">
      Transform enterprise PDFs into structured,
      searchable knowledge using OCR, vector search,
      and AI-powered retrieval.
    </p>

  </div>

</div>

        {/* RIGHT PANEL */}

        <div className="w-1/2 flex items-center justify-center bg-white px-12">

          <div className="w-full max-w-md">

            <AnimatePresence mode="wait">

              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >

                  <h2 className="text-5xl font-bold text-slate-900 mb-3">
                    Welcome Back
                  </h2>

                  <p className="text-slate-500 mb-10">
                    Sign in to continue using Atlas
                  </p>

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-4 mb-6 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 caret-blue-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-4 mb-6 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 caret-blue-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition">
                    Login
                  </button>

                  <div className="flex justify-center mt-8">

                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Create Account →
                    </button>

                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >

                  <h2 className="text-5xl font-bold text-slate-900 mb-3">
                    Create Account
                  </h2>

                  <p className="text-slate-500 mb-10">
                    Start your Atlas journey
                  </p>

                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-4 mb-6 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 caret-blue-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-4 mb-4 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 caret-blue-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-4 mb-6 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 caret-blue-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition">
                    Create Account
                  </button>

                  <div className="flex justify-center mt-8">

                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      ← Back to Login
                    </button>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>

    </main>
  );
}