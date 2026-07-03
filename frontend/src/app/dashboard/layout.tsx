import { Sidebar } from '@/features/dashboard/components/Sidebar';
import { Header } from '@/features/dashboard/components/Header';
import '@/features/dashboard/styles/Dashboard.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout-container">
      <Sidebar />

      <div className="dashboard-main-content">
        <Header />
        
        <main className="dashboard-viewport">
          {children}
        </main>
      </div>
    </div>
  );
}
