// components/dashboard/ActivityFeed.tsx

import {
  FileText,
  MessageSquare,
  FolderPlus,
  Trash2,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    icon: FileText,
    text: "HR Policy.pdf uploaded",
    time: "2 hrs ago",
  },
  {
    icon: MessageSquare,
    text: 'Asked "What is leave policy?"',
    time: "1 hr ago",
  },
  {
    icon: FolderPlus,
    text: "Engineering Docs collection created",
    time: "45 mins ago",
  },
  {
    icon: Trash2,
    text: "Old_Report.pdf deleted",
    time: "30 mins ago",
  },
  {
    icon: UserPlus,
    text: "Sarah joined workspace",
    time: "10 mins ago",
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">
          Activity Feed
        </h2>

        <button className="text-blue-600 text-sm">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex gap-3"
            >
              <div className="bg-blue-50 p-2 rounded-lg h-fit">
                <Icon
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm font-medium">
                  {activity.text}
                </p>

                <p className="text-xs text-gray-500">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}