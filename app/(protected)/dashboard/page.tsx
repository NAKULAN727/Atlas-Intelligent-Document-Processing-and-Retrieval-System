import Navbar from "@/components/dashboard/Navbar";
import StatsCards from "@/components/dashboard/StatsCard";
import RecentDocuments from "@/components/dashboard/RecentDocument";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <Navbar />

      <StatsCards />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <RecentDocuments />
        </div>

        <div>
          <ActivityFeed />
        </div>
      </div>
    </main>
  );
}
