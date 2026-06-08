"use client";

import React, { useState } from "react";
import { useDocuments } from "@/context/DocumentContext";
import { Folder, FolderPlus, Plus, FileText, Calendar, Database } from "lucide-react";

export default function CollectionsPage() {
  const { collections, documents, createCollection } = useDocuments();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    createCollection(newCollectionName);
    setNewCollectionName("");
    setIsCreating(false);
  };

  // Documents inside the selected collection
  const collectionDocs = documents.filter(
    (doc) => doc.collection === selectedCollection
  );

  return (
    <main className="flex-1 p-8 overflow-y-auto text-slate-900 animate-fadeIn">
      {/* Page Title & Action */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Collections</h1>
          <p className="text-slate-500 mt-1">Organize your documents into distinct search spaces.</p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition flex gap-2 items-center font-medium shadow-lg shadow-blue-500/10 cursor-pointer"
        >
          <FolderPlus size={18} />
          Create Collection
        </button>
      </div>

      {/* Creation Modal/Form */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] animate-fadeIn">
          <form 
            onSubmit={handleCreate}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">Create New Collection</h3>
            <p className="text-xs text-gray-500 mb-4">Search spaces let you segregate documents for separate AI chats.</p>

            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="e.g. Q3 Marketing Docs"
              className="w-full p-3 border border-slate-200 rounded-xl mb-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm bg-slate-50"
              autoFocus
              required
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border rounded-xl hover:bg-slate-50 transition font-medium cursor-pointer text-slate-700 border-slate-200 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-medium cursor-pointer text-sm shadow-md shadow-blue-500/10"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Core Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Collections List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((coll) => {
              const isSelected = selectedCollection === coll.name;
              return (
                <div
                  key={coll.id}
                  onClick={() => setSelectedCollection(isSelected ? null : coll.name)}
                  className={`p-6 bg-white border rounded-2xl shadow-sm cursor-pointer transition duration-150 relative ${
                    isSelected 
                      ? "border-blue-500 ring-2 ring-blue-50" 
                      : "border-slate-200 hover:bg-slate-50/55"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                      <Folder size={20} />
                    </div>
                    <span className="text-xs font-semibold bg-slate-100 px-2.5 py-1 rounded-full text-slate-600 flex items-center gap-1">
                      <Database size={10} />
                      {coll.documentCount} {coll.documentCount === 1 ? "PDF" : "PDFs"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 truncate">
                    {coll.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                    <Calendar size={12} />
                    Created recently
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Selected Collection Documents */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            {selectedCollection ? `${selectedCollection} Documents` : "Select a Collection"}
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            {selectedCollection 
              ? "View the documents associated with this search space."
              : "Click on any collection in the grid to view its files."
            }
          </p>

          {!selectedCollection ? (
            <div className="py-12 text-center text-gray-400 border border-dashed rounded-xl border-slate-200 bg-slate-50">
              <Folder size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs">No collection selected</p>
            </div>
          ) : collectionDocs.length === 0 ? (
            <div className="py-12 text-center text-gray-400 border border-dashed rounded-xl border-slate-200 bg-slate-50">
              <FileText size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs">No documents in this collection</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {collectionDocs.map((doc) => (
                <div 
                  key={doc.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 border rounded-xl"
                >
                  <FileText className="text-red-500 flex-shrink-0" size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {doc.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {doc.size} • {doc.uploaded}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
