import Sidebar from "@/components/dashboard/Sidebar";
import UploadModal from "@/components/documents/UploadModal";
import { DocumentProvider } from "@/context/DocumentContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocumentProvider>
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {children}
        </div>
        <UploadModal />
      </div>
    </DocumentProvider>
  );
}
