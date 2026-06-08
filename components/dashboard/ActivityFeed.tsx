"use client";

import {
  FileText,
  MessageSquare,
  FolderPlus,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useDocuments } from "@/context/DocumentContext";

const iconMap = {
  file: FileText,
  message: MessageSquare,
  folder: FolderPlus,
  trash: Trash2,
  user: UserPlus,
};

export default function ActivityFeed() {
  const { activities } = useDocuments();

  // Show the most recent 5 activities
  const recentActivities = [...activities]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 h-full flex flex-col justify-between transition-colors duration-200">
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Activity Feed
          </h2>

          <button 
            onClick={() => alert("All activity logs are loaded in this panel.")}
            className="text-blue-600 text-sm font-medium hover:text-blue-700 transition cursor-pointer"
          >
            View All
          </button>
        </div>

        {recentActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500 animate-fadeIn">
            <p className="text-sm">No activity recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {recentActivities.map((activity) => {
              const Icon = iconMap[activity.iconType] || FileText;

              return (
                <div
                  key={activity.id}
                  className="flex gap-3 animate-fadeIn"
                >
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg h-fit">
                    <Icon
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-950 dark:text-slate-200">
                      {activity.text}
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}