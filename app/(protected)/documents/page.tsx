"use client";

import DocumentTable from "@/components/documents/DocumentTable";
import { useDocuments } from "@/context/DocumentContext";

export default function DocumentsPage() {
  const { setIsUploadModalOpen } = useDocuments();

  return (
    <main className="flex-1 p-8 overflow-y-auto text-slate-900 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Documents
          </h1>

          <p className="text-slate-500 mt-1">
            Manage and search uploaded PDFs
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/10 font-medium cursor-pointer"
        >
          Upload PDF
        </button>
      </div>

      <DocumentTable />
    </main>
  );
}
