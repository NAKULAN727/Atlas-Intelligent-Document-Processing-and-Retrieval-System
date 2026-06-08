"use client";

import { useDocuments } from "@/context/DocumentContext";
import DragDropZone from "./DragDropZone";
import { CheckCircle2, Loader2, FileText, AlertCircle } from "lucide-react";

export default function UploadModal() {
  const { 
    isUploadModalOpen, 
    setIsUploadModalOpen, 
    uploadingFile, 
    resetUploadState 
  } = useDocuments();

  if (!isUploadModalOpen) return null;

  const handleClose = () => {
    resetUploadState();
    setIsUploadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Upload PDF
          </h2>

          {(!uploadingFile || uploadingFile.status === "success") && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition text-lg cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {!uploadingFile || uploadingFile.status === "idle" ? (
            <DragDropZone />
          ) : (
            <div className="p-8 text-center flex flex-col items-center">
              {uploadingFile.status === "uploading" && (
                <div className="w-full animate-fadeIn">
                  <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Loader2 size={28} className="animate-spin" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">
                    Uploading Document...
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 truncate max-w-[320px] mx-auto">
                    {uploadingFile.name} ({uploadingFile.size})
                  </p>
                  
                  {/* Progress Bar Container */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-150 ease-out"
                      style={{ width: `${uploadingFile.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-gray-500">
                    <span>Progress</span>
                    <span>{uploadingFile.progress}%</span>
                  </div>
                </div>
              )}

              {uploadingFile.status === "processing" && (
                <div className="w-full animate-fadeIn">
                  <div className="h-14 w-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Loader2 size={28} className="animate-spin" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">
                    Processing OCR & Embeddings...
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 truncate max-w-[320px] mx-auto">
                    {uploadingFile.name}
                  </p>
                  
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                    <div className="bg-yellow-500 h-full rounded-full w-full animate-pulse" />
                  </div>
                  <div className="text-xs font-semibold text-yellow-600 text-left">
                    Extracting structured layout and indexing vectors...
                  </div>
                </div>
              )}

              {uploadingFile.status === "success" && (
                <div className="w-full animate-fadeIn">
                  <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={36} className="animate-bounce" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-1">
                    Upload Complete!
                  </h3>
                  <p className="text-sm text-green-600 font-medium mb-3">
                    Document successfully indexed
                  </p>
                  <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 flex items-center gap-3 max-w-[350px] mx-auto mb-6 text-left">
                    <FileText className="text-red-500 flex-shrink-0" size={24} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {uploadingFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {uploadingFile.size} • Ready for queries
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-500/10 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions when no upload in progress */}
        {(!uploadingFile || uploadingFile.status === "idle") && (
          <div className="flex justify-end gap-3 mt-6 border-t pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2.5 border rounded-xl hover:bg-slate-50 transition font-medium cursor-pointer text-slate-700 border-slate-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}