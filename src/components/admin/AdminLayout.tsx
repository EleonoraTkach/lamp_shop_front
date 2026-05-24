import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader.tsx";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}