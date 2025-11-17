import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <AdminNav />
      <main className="flex-grow py-8">
        <Outlet />
      </main>
    </div>
  );
}

