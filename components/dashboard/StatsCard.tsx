"use client";

import { useDocuments } from "@/context/DocumentContext";

export default function StatsCards() {
  const { documents, collections } = useDocuments();

  // Compute total storage dynamically
  const totalMB = documents.reduce((sum, doc) => {
    const parts = doc.size.split(" ");
    const val = parseFloat(parts[0]) || 0;
    const unit = parts[1] || "MB";
    if (unit === "KB") return sum + val / 1024;
    if (unit === "GB") return sum + val * 1024;
    return sum + val;
  }, 0);

  const storageFormatted = totalMB >= 1024 
    ? `${(totalMB / 1024).toFixed(1)} GB`
    : `${totalMB.toFixed(1)} MB`;

  const stats = [
    { title: "Total PDFs", value: documents.length.toString() },
    { title: "Storage Used", value: storageFormatted },
    { title: "Collections", value: collections.length.toString() },
    { title: "Chats", value: "384" }, // static mock or based on chats
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-200"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {stat.title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-900 dark:text-slate-100">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}