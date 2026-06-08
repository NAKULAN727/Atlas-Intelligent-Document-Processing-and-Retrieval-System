"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface DocumentItem {
  id: string;
  name: string;
  size: string;
  status: "Ready" | "Processing" | "Failed" | "Indexing";
  uploaded: string; // Relative time string
  collection: string;
  createdAt: number;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string; // Relative time string
  createdAt: number;
  iconType: "file" | "message" | "folder" | "trash" | "user";
}

export interface CollectionItem {
  id: string;
  name: string;
  documentCount: number;
  createdAt: number;
}

interface UploadProgress {
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "processing" | "success" | "idle";
}

interface DocumentContextType {
  documents: DocumentItem[];
  activities: ActivityItem[];
  collections: CollectionItem[];
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  uploadingFile: UploadProgress | null;
  uploadFile: (file: File, collectionName?: string) => Promise<void>;
  deleteDocument: (id: string) => void;
  addActivity: (text: string, iconType: ActivityItem["iconType"]) => void;
  createCollection: (name: string) => void;
  resetUploadState: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<UploadProgress | null>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize state from localStorage or load defaults
  useEffect(() => {
    const savedDocs = localStorage.getItem("atlas_documents");
    const savedActivities = localStorage.getItem("atlas_activities");
    const savedCollections = localStorage.getItem("atlas_collections");

    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    } else {
      const defaultDocs: DocumentItem[] = [
        {
          id: "1",
          name: "HR Policy.pdf",
          size: "2.4 MB",
          status: "Ready",
          uploaded: "2 hrs ago",
          collection: "HR Docs",
          createdAt: Date.now() - 2 * 60 * 60 * 1000,
        },
        {
          id: "2",
          name: "Financial Report.pdf",
          size: "8.1 MB",
          status: "Ready",
          uploaded: "10 mins ago",
          collection: "Finance",
          createdAt: Date.now() - 10 * 60 * 1000,
        },
      ];
      setDocuments(defaultDocs);
      localStorage.setItem("atlas_documents", JSON.stringify(defaultDocs));
    }

    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      const defaultActivities: ActivityItem[] = [
        {
          id: "a1",
          text: "HR Policy.pdf uploaded",
          time: "2 hrs ago",
          createdAt: Date.now() - 2 * 60 * 60 * 1000,
          iconType: "file",
        },
        {
          id: "a2",
          text: 'Asked "What is leave policy?"',
          time: "1 hr ago",
          createdAt: Date.now() - 1 * 60 * 60 * 1000,
          iconType: "message",
        },
        {
          id: "a3",
          text: "Engineering Docs collection created",
          time: "45 mins ago",
          createdAt: Date.now() - 45 * 60 * 1000,
          iconType: "folder",
        },
        {
          id: "a4",
          text: "Old_Report.pdf deleted",
          time: "30 mins ago",
          createdAt: Date.now() - 30 * 60 * 1000,
          iconType: "trash",
        },
        {
          id: "a5",
          text: "Sarah joined workspace",
          time: "10 mins ago",
          createdAt: Date.now() - 10 * 60 * 1000,
          iconType: "user",
        },
      ];
      setActivities(defaultActivities);
      localStorage.setItem("atlas_activities", JSON.stringify(defaultActivities));
    }

    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    } else {
      const defaultCollections: CollectionItem[] = [
        { id: "c1", name: "HR Docs", documentCount: 1, createdAt: Date.now() - 3 * 3600 * 1000 },
        { id: "c2", name: "Finance", documentCount: 1, createdAt: Date.now() - 2 * 3600 * 1000 },
        { id: "c3", name: "Engineering Docs", documentCount: 0, createdAt: Date.now() - 45 * 60 * 1000 },
      ];
      setCollections(defaultCollections);
      localStorage.setItem("atlas_collections", JSON.stringify(defaultCollections));
    }

    setMounted(true);
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("atlas_documents", JSON.stringify(documents));
    }
  }, [documents, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("atlas_activities", JSON.stringify(activities));
    }
  }, [activities, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("atlas_collections", JSON.stringify(collections));
    }
  }, [collections, mounted]);

  const addActivity = (text: string, iconType: ActivityItem["iconType"]) => {
    const newActivity: ActivityItem = {
      id: Date.now().toString(),
      text,
      time: "Just now",
      createdAt: Date.now(),
      iconType,
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const uploadFile = async (file: File, collectionName = "HR Docs") => {
    const formatted = formatSize(file.size);
    setUploadingFile({
      name: file.name,
      size: formatted,
      progress: 0,
      status: "uploading",
    });

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress < 100) {
        setUploadingFile((prev) =>
          prev ? { ...prev, progress: currentProgress } : null
        );
      } else {
        clearInterval(interval);
        setUploadingFile((prev) =>
          prev ? { ...prev, progress: 100, status: "processing" } : null
        );

        // Transition from processing to success after 1.2s
        setTimeout(() => {
          setUploadingFile((prev) =>
            prev ? { ...prev, status: "success" } : null
          );

          // Add file to document list
          const newDoc: DocumentItem = {
            id: Date.now().toString(),
            name: file.name,
            size: formatted,
            status: "Ready",
            uploaded: "Just now",
            collection: collectionName,
            createdAt: Date.now(),
          };

          setDocuments((prev) => [newDoc, ...prev]);

          // Update document counts in collections
          setCollections((prev) =>
            prev.map((c) =>
              c.name === collectionName
                ? { ...c, documentCount: c.documentCount + 1 }
                : c
            )
          );

          addActivity(`${file.name} uploaded`, "file");
        }, 1200);
      }
    }, 120);
  };

  const deleteDocument = (id: string) => {
    const docToDelete = documents.find((d) => d.id === id);
    if (!docToDelete) return;

    setDocuments((prev) => prev.filter((d) => d.id !== id));
    
    // Decrement count in collections
    setCollections((prev) =>
      prev.map((c) =>
        c.name === docToDelete.collection
          ? { ...c, documentCount: Math.max(0, c.documentCount - 1) }
          : c
      )
    );

    addActivity(`${docToDelete.name} deleted`, "trash");
  };

  const createCollection = (name: string) => {
    if (collections.some((c) => c.name.toLowerCase() === name.toLowerCase())) return;

    const newColl: CollectionItem = {
      id: Date.now().toString(),
      name,
      documentCount: 0,
      createdAt: Date.now(),
    };
    setCollections((prev) => [...prev, newColl]);
    addActivity(`Collection "${name}" created`, "folder");
  };

  const resetUploadState = () => {
    setUploadingFile(null);
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        activities,
        collections,
        isUploadModalOpen,
        setIsUploadModalOpen,
        uploadingFile,
        uploadFile,
        deleteDocument,
        addActivity,
        createCollection,
        resetUploadState,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
}
