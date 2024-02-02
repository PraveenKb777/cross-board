import { Navbar } from "./_components/Navbar";
import OrgSideBar from "./_components/OrgSideBar";
import Sidebar from "./_components/sidebar";

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSideBar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
