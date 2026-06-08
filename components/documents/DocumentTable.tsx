import {
  Eye,
  Download,
  Trash2,
} from "lucide-react";

const documents = [
  {
    id: 1,
    name: "HR Policy.pdf",
    size: "2.4 MB",
    status: "Ready",
    uploaded: "2 hrs ago",
  },
  {
    id: 2,
    name: "Financial Report.pdf",
    size: "8.1 MB",
    status: "Processing",
    uploaded: "10 mins ago",
  },
];

export default function DocumentTable() {
  return (
    <div className="bg-white border rounded-xl p-5">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="pb-3">Document</th>
            <th>Status</th>
            <th>Size</th>
            <th>Uploaded</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="border-b"
            >
              <td className="py-4">
                {doc.name}
              </td>

              <td>{doc.status}</td>

              <td>{doc.size}</td>

              <td>{doc.uploaded}</td>

              <td>
                <div className="flex gap-3">
                  <Eye size={18} />

                  <Download size={18} />

                  <Trash2
                    size={18}
                    className="text-red-500"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}