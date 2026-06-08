"use client";

import {
  Eye,
  MessageSquare,
  Download,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useDocuments } from "@/context/DocumentContext";
import { useRouter } from "next/navigation";

export default function RecentDocuments() {
  const { documents, deleteDocument, setIsUploadModalOpen } = useDocuments();
  const router = useRouter();

  // Show the most recent 5 documents
  const recentDocs = [...documents]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const handleDownload = (docName: string) => {
    // Simulated download trigger
    alert(`Downloading ${docName}...`);
  };

  const handleChat = (docName: string) => {
    // Navigate to Chat screen
    router.push("/chat");
  };

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Recent Documents
        </h2>

        <Link 
          href="/documents"
          className="text-blue-600 text-sm font-medium hover:text-blue-700 transition"
        >
          View All
        </Link>
      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            No Documents Yet
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
            Upload your first PDF to start building
            your knowledge base and chat with your
            documents.
          </p>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition shadow-lg shadow-blue-500/10 font-medium cursor-pointer"
          >
            Upload PDF
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-slate-900 dark:text-slate-100">
            <thead>
              <tr className="border-b text-left text-gray-500 text-sm">
                <th className="pb-3 font-semibold">Document</th>
                <th className="pb-3 font-semibold">Collection</th>
                <th className="pb-3 font-semibold">Size</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Uploaded</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {recentDocs.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition duration-150 animate-fadeIn"
                >
                  <td className="py-4 font-medium max-w-[200px] truncate text-slate-900 dark:text-slate-100">
                    {doc.name}
                  </td>

                  <td className="text-gray-500 dark:text-gray-400 text-sm">{doc.collection}</td>

                  <td className="text-gray-500 dark:text-gray-400 text-sm">{doc.size}</td>

                  <td>
                    <StatusBadge
                      status={doc.status}
                    />
                  </td>

                  <td className="text-gray-500 dark:text-gray-400 text-sm">{doc.uploaded}</td>

                  <td>
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                      <button 
                        onClick={() => alert(`Previewing ${doc.name}...`)}
                        className="hover:text-blue-600 transition cursor-pointer"
                        title="View Document"
                      >
                        <Eye size={18} />
                      </button>

                      <button 
                        onClick={() => handleChat(doc.name)}
                        className="hover:text-green-600 transition cursor-pointer"
                        title="Chat about this document"
                      >
                        <MessageSquare size={18} />
                      </button>

                      <button 
                        onClick={() => handleDownload(doc.name)}
                        className="hover:text-purple-600 transition cursor-pointer"
                        title="Download PDF"
                      >
                        <Download size={18} />
                      </button>

                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="hover:text-red-600 transition cursor-pointer"
                        title="Delete Document"
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
      )}
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