"use client";

import { Search, Upload } from "lucide-react";
import { useDocuments } from "@/context/DocumentContext";

export default function Navbar() {
  const { setIsUploadModalOpen } = useDocuments();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative">
        <Search
          className="absolute left-3 top-3 text-slate-400"
          size={18}
        />

        <input
          placeholder="Search PDFs..."
          className="pl-10 pr-4 py-2 border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        onClick={() => setIsUploadModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex gap-2 items-center transition cursor-pointer font-medium"
      >
        <Upload size={18} />
        Upload PDF
      </button>
    </div>
  );
}