"use client";

import {
  Eye,
  Download,
  Trash2,
  FileText,
} from "lucide-react";
import { useDocuments } from "@/context/DocumentContext";

export default function DocumentTable() {
  const { documents, deleteDocument } = useDocuments();

  const handleDownload = (docName: string) => {
    alert(`Downloading ${docName}...`);
  };

  const handlePreview = (docName: string) => {
    alert(`Opening preview for ${docName}...`);
  };

  if (documents.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-16 text-center text-gray-500 dark:text-gray-400 animate-fadeIn transition-colors duration-200">
        <FileText size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1">No Documents Uploaded</h3>
        <p className="max-w-md mx-auto text-sm text-gray-500 dark:text-gray-400">
          Your document library is empty. Click the Upload PDF button above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm overflow-hidden animate-fadeIn transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-slate-900 dark:text-slate-100">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-left text-gray-500 dark:text-gray-400 text-sm font-semibold">
              <th className="pb-3">Document</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Size</th>
              <th className="pb-3">Uploaded</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition duration-150"
              >
                <td className="py-4 font-medium flex items-center gap-2 max-w-[300px] truncate text-slate-900 dark:text-slate-100">
                  <FileText size={18} className="text-red-500 flex-shrink-0" />
                  <span className="truncate">{doc.name}</span>
                </td>

                <td>
                  <StatusBadge status={doc.status} />
                </td>

                <td className="text-gray-500 dark:text-gray-400 text-sm">{doc.size}</td>

                <td className="text-gray-500 dark:text-gray-400 text-sm">{doc.uploaded}</td>

                <td>
                  <div className="flex gap-4 text-gray-500 dark:text-gray-400">
                    <button
                      onClick={() => handlePreview(doc.name)}
                      className="hover:text-blue-600 transition cursor-pointer"
                      title="View PDF"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => handleDownload(doc.name)}
                      className="hover:text-green-600 transition cursor-pointer"
                      title="Download PDF"
                    >
                      <Download size={18} />
                    </button>

                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="hover:text-red-600 transition cursor-pointer"
                      title="Delete PDF"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles = {
    Ready:
      "bg-green-100 text-green-700",
    Processing:
      "bg-yellow-100 text-yellow-700",
    Failed:
      "bg-red-100 text-red-700",
    Indexing:
      "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status as keyof typeof styles] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}