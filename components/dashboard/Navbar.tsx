// components/dashboard/Navbar.tsx

import { Search, Upload } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative">
        <Search
          className="absolute left-3 top-3"
          size={18}
        />

        <input
          placeholder="Search PDFs..."
          className="pl-10 pr-4 py-2 border rounded-lg w-80"
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2">
        <Upload size={18} />
        Upload PDF
      </button>
    </div>
  );
}