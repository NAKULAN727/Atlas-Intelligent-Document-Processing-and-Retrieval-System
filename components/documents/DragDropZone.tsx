"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

export default function DragDropZone() {
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      onDrop: (acceptedFiles) => {
        console.log(acceptedFiles);
      },
    });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
      ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud
        className="mx-auto mb-4 text-gray-500"
        size={50}
      />

      <h3 className="font-semibold text-lg">
        Drag & Drop PDF Here
      </h3>

      <p className="text-gray-500 mt-2">
        or click to browse files
      </p>
    </div>
  );
}