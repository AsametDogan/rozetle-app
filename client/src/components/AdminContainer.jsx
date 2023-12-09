import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import { getMyInfo } from "../services/authService.ts";

const AdminContainer = () => {
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) window.location.href = "/admin";
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="bg-gray-300 w-full h-screen  flex flex-col gap-5 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminContainer;
