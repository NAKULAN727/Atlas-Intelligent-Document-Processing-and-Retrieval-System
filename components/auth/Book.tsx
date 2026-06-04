"use client";

import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface BookProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export default function Book({
  isLogin,
  setIsLogin,
}: BookProps) {
  return (
    <div className="relative w-[1000px] h-[680px] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex">

      {/* Spine */}

      <div className="absolute left-1/2 top-0 h-full w-px bg-slate-700" />

      {/* Left Page */}

      <div className="w-1/2 flex flex-col justify-center px-16">

        <h1 className="text-7xl font-bold text-white">
          Atlas
        </h1>

        <p className="text-slate-400 mt-8 text-xl leading-relaxed max-w-md">
          Transform enterprise documents into
          structured and searchable knowledge.
        </p>

      </div>

      {/* Right Page */}

      <div className="w-1/2 flex items-center justify-center px-12">

        <AnimatePresence mode="wait">

          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <LoginForm
                onSwitch={() => setIsLogin(false)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <RegisterForm
                onSwitch={() => setIsLogin(true)}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
}