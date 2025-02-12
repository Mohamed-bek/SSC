import React from "react";
import { Outlet } from "react-router-dom";

function AdminMember() {
  return (
    <div className="p-3 w-full h-full">
      <Outlet />
    </div>
  );
}

export default AdminMember;
