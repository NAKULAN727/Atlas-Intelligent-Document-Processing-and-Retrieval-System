// components/dashboard/RecentDocuments.tsx

import {
  Eye,
  MessageSquare,
  Download,
  Trash2,
} from "lucide-react";

const documents: {
  id: number;
  name: string;
  collection: string;
  size: string;
  status: "Ready" | "Processing" | "Failed" | "Indexing";
  uploaded: string;
}[] = [];

// Example data for testing:
// const documents = [
//   {
//     id: 1,
//     name: "HR Policy.pdf",
//     collection: "HR Docs",
//     size: "2.4 MB",
//     status: "Ready",
//     uploaded: "2 hrs ago",
//   },
// ];

export default function RecentDocuments() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">
          Recent Documents
        </h2>

        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View All
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h3 className="text-xl font-semibold">
            No Documents Yet
          </h3>

          <p className="text-gray-500 mt-2 max-w-md">
            Upload your first PDF to start building
            your knowledge base and chat with your
            documents.
          </p>

          <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition">
            Upload PDF
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-gray-500 text-sm">
                <th className="pb-3">Document</th>
                <th className="pb-3">Collection</th>
                <th className="pb-3">Size</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Uploaded</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium">
                    {doc.name}
                  </td>

                  <td>{doc.collection}</td>

                  <td>{doc.size}</td>

                  <td>
                    <StatusBadge
                      status={doc.status}
                    />
                  </td>

                  <td>{doc.uploaded}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <button className="hover:text-blue-600 transition">
                        <Eye size={18} />
                      </button>

                      <button className="hover:text-green-600 transition">
                        <MessageSquare size={18} />
                      </button>

                      <button className="hover:text-purple-600 transition">
                        <Download size={18} />
                      </button>

                      <button className="hover:text-red-600 transition">
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
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  );
}