import { FileText } from "lucide-react";

interface Props {
  name: string;
  size: string;
  status: string;
}

export default function DocumentCard({
  name,
  size,
  status,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <FileText className="text-red-500" />

        <div>
          <h3 className="font-medium">{name}</h3>

          <p className="text-sm text-gray-500">
            {size}
          </p>
        </div>
      </div>

      <span className="inline-block mt-4 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
        {status}
      </span>
    </div>
  );
}