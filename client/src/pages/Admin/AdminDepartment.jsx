import React from "react";
import { Outlet } from "react-router-dom";

function AdminDepartment() {
  return (
    <div className="p-3 h-full w-full bg-secondary">
      <Outlet />
    </div>
  );
}

export default AdminDepartment;
