"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { useDocuments } from "@/context/DocumentContext";

export default function DragDropZone() {
  const { uploadFile } = useDocuments();

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
          uploadFile(acceptedFiles[0]);
        }
      },
    });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition duration-200 flex flex-col justify-center items-center h-64
      ${
        isDragActive
          ? "border-blue-500 bg-blue-50/50"
          : "border-gray-200 hover:border-gray-300 hover:bg-slate-50/50"
      }`}
    >
      <input {...getInputProps()} />

      <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 transition duration-200">
        <UploadCloud size={24} />
      </div>

      <h3 className="font-bold text-lg text-slate-900 mb-1">
        {isDragActive ? "Drop PDF Here" : "Drag & Drop PDF Here"}
      </h3>

      <p className="text-gray-500 text-sm max-w-xs mt-1">
        Upload files to build your knowledge base. Supports PDF documents up to 50MB.
      </p>

      <span className="mt-4 text-xs font-semibold text-blue-600 hover:underline">
        or browse local files
      </span>
    </div>
  );
}